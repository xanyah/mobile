import { FlatList } from 'react-native';
import { ShippingState } from '../../components';
import { Date, LeftContainer, RightContainer, ShippingContainer, Title } from './styled-components';
import { useShippings } from '../../hooks';
import { ArrowRight } from 'lucide-react-native';
import { head, split } from 'lodash';
import { DateTime } from 'luxon';

const Shippings = () => {
  const { data, refetch, isFetching } = useShippings({
    'q[s]': 'created_at desc',
  })

  return (
    <FlatList
      data={data?.data}
      renderItem={({ item }) => (
        <ShippingContainer>
          <LeftContainer>
            <Title>{head(split(item.id, '-'))} - {item.provider.name}</Title>
            <Date>{DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATETIME_MED)}</Date>
          </LeftContainer>
          <RightContainer>
            <ShippingState state={item.state} />
            <ArrowRight />
          </RightContainer>
        </ShippingContainer>
      )}
      refreshing={isFetching}
      onRefresh={() => refetch()}
      keyExtractor={item => item.id}
    />
  );
};

export default Shippings;
