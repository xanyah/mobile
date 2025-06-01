import { InputsContainer, MainContainer, Title } from "./styled-components"

interface FormSectionProps {
  title: string
  children?: React.ReactNode | React.ReactNode[]
}

const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <MainContainer>
      <Title>{title}</Title>
      <InputsContainer>
        {children}
      </InputsContainer>
    </MainContainer>
  )
}

export default FormSection
