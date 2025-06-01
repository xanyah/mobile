import { TouchableOpacityProps } from "react-native";
import { Container, Text } from "./styled-components";
import { isArray, map } from "lodash";

type ButtonProps = TouchableOpacityProps & {
  size?: 'md' | 'sm'
}

const renderChild = (child, idx = '') => {
  if (typeof child === 'string') {
    return <Text key={child}>{child}</Text>
  }

  return child
}

const Button = ({
  children,
  size = 'md',
  ...props
}: ButtonProps) => {
  return (
    <Container size={size} {...props}>
      {isArray(children) ? map(children, renderChild) : renderChild(children)}
    </Container>
  )
}

export default Button
