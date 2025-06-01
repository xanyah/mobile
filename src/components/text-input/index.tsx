import { TextInputProps as RNTextInputProps, TextInput as RNTextInput, StyleProp, ViewStyle } from 'react-native'
import { Container, Error, ErrorsContainer, Hint, Label, TextInput as StyledTextInput } from './styled-components'
import { map } from 'lodash'
import { forwardRef } from 'react'


type TextInputProps = RNTextInputProps & {
  label?: string,
  errors?: string[],
  hint?: string
  containerStyle?: StyleProp<ViewStyle>
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(({ label, errors, containerStyle, hint, ...props }, ref) => {
  return <Container style={containerStyle}>
    {label && <Label>{label}</Label>}
    <StyledTextInput as={RNTextInput} ref={ref} {...props} />
    {errors && (
      <ErrorsContainer>
        {map(errors, error => (
          <Error key={error}>{error}</Error>
        ))}
      </ErrorsContainer>
    )}
    {hint && <Hint>{hint}</Hint>}
  </Container>
})

export default TextInput
