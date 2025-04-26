import { TextInputProps as RNTextInputProps, TextInput as RNTextInput} from 'react-native'
import { Container, Error, ErrorsContainer, Label, TextInput as StyledTextInput } from './styled-components'
import { map } from 'lodash'
import { forwardRef } from 'react'


type TextInputProps = RNTextInputProps & {
  label?: string,
  errors?: string[]
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(({label, errors, ...props}, ref) => {
  return <Container>
    {label && <Label>{label}</Label>}
    <StyledTextInput as={RNTextInput} ref={ref} {...props} />
    {errors && (
      <ErrorsContainer>
        {map(errors, error => (
          <Error key={error}>{error}</Error>
        ))}
      </ErrorsContainer>
    )}
  </Container>
})

export default TextInput
