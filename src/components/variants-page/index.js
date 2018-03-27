/* eslint-disable no-nested-ternary, class-methods-use-this */

import React from 'react'
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import PropTypes from 'prop-types'

import styles from './styles'

import FloatingButton from '../floating-button'
import I18n from '../../i18n'
import { icons } from '../../images'
import { shortDate } from '../../utils/date-helper'

class InventoryPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state

    return {
      headerRight: params ? params.menu() : null,
      title: params ? params.title : '',
    }
  }

  constructor(props) {
    super(props)

    this.entity = {}
  }

  componentWillMount() {
    this.setEntity()
    this.props.getVariants()
    this.props.navigation.setParams({
      menu: () => this.renderMenu(),
      title: this.props.type === 'inventory'
        ? I18n.t('inventory_title', { date: shortDate(this.props.currentInventory.createdAt) })
        : this.props.currentShipping.provider
          ? this.props.currentShipping.provider.name
          : '',
    })
  }

  setEntity() {
    this.entity = this.props.type === 'inventory'
      ? this.props.currentInventory
      : this.props.currentShipping
  }

  setMenuRef(ref) {
    this.menu = ref
  }

  menu = null;

  hideMenu() {
    this.menu.hide()
  }

  showMenu() {
    this.menu.show()
  }

  sendAlert(type, func, callback) {
    Alert.alert(
      I18n.t(`${type}_alert_title`),
      I18n.t(`${type}_alert_body`),
      [
        {
          style: 'cancel',
          text: I18n.t('cancel'),
        },
        {
          onPress: () =>
            func(this.entity.id)
              .then(() => callback()),
          style: 'destructive',
          text: I18n.t(type),
        },
      ],
    )
  }

  lock() {
    this.sendAlert('lock', this.props.lock, this.props.goBack)
  }

  delete() {
    this.sendAlert('delete', this.props.delete, this.props.goBack)
  }

  renderMenu() {
    return this.entity.lockedAt
      ? null
      : (
        <Menu
          ref={ref => this.setMenuRef(ref)}
          button={
            <TouchableOpacity onPress={() => this.showMenu()} style={{ marginHorizontal: 20 }}>
              <Image source={icons.gear} />
            </TouchableOpacity>}
        >
          <MenuItem onPress={() => this.lock()}>{I18n.t('lock')}</MenuItem>
          <MenuDivider />
          <MenuItem onPress={() => this.delete()}>{I18n.t('delete')}</MenuItem>
        </Menu>
      )
  }

  renderArticle(item) {
    return (
      <View
        style={styles.itemContainer}
      >
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.itemTitle}>{item.variant.product.name}</Text>
          <Text style={styles.itemSubtitle}>
            {item.variant.barcode}
          </Text>
        </View>
        <View style={styles.articlesCountContainer}>
          <Text style={styles.itemCount}>{item.quantity}</Text>
        </View>
      </View>
    )
  }

  render() {
    return [
      <FlatList
        data={this.props.variants}
        key="variants-list"
        keyExtractor={item => item.id}
        onRefresh={() => this.props.getVariants()}
        refreshing={this.props.loading}
        renderItem={({ item }) => this.renderArticle(item)}
      />,
      <FloatingButton
        key="action-button"
        icon="photoCameraWhite"
        onPress={this.props.goToCamera}
      />,
    ]
  }
}

InventoryPage.propTypes = {
  currentInventory: PropTypes.object,
  currentShipping: PropTypes.object,
  delete: PropTypes.func.isRequired,
  getVariants: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  goToCamera: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  lock: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  type: PropTypes.string,
  variants: PropTypes.array.isRequired,
}

InventoryPage.defaultProps = {
  currentInventory: {},
  currentShipping: {},
  type: '',
}

export default InventoryPage
