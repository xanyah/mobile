import { TouchableOpacityProps } from "react-native";
import { Container, Text } from "./styled-components";

type ButtonProps = TouchableOpacityProps & {
  size?: 'md' | 'sm'
}

const Button = ({
  children,
  size = 'md',
  ...props
}: ButtonProps) => (
  <Container size={size} {...props}>
    <Text>{children}</Text>
  </Container>
)

export default Button
