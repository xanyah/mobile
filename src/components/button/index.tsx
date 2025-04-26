import { TouchableOpacityProps } from "react-native";
import { Container, Text } from "./styled-components";

type ButtonProps = TouchableOpacityProps

const Button = ({children, ...props}: ButtonProps) => (
  <Container {...props}>
    <Text>{children}</Text>
  </Container>
)

export default Button
