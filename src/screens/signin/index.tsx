import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { SafeAreaView, TextInput as RNTextInput } from "react-native"
import { z } from "zod"
import { Button, TextInput } from "../../components"
import { useCallback, useRef } from "react"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "../../api/auth"
import SecureStorage from "react-native-fast-secure-storage"
import { Container } from "./styled-components"

const signinSchema = z.object({
  username: z.string().email(),
  password: z.string(),
})

const SignIn = () => {
  const { handleSubmit, control } = useForm({
  resolver: zodResolver(signinSchema),
  })
  const passwordInputRef = useRef<RNTextInput>(null)

  const {mutate} = useMutation({
    mutationFn: signIn,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (response) => {
      SecureStorage.setItem(`Xanyah:Bearer`, `${response.data.tokenType} ${response.data.accessToken}`)
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutate({ ...data, grantType: 'password' })
  })

  return <Container>
    <Controller
      control={control}
      name="username"
      render={({ field, fieldState: { error } }) => (
        <TextInput
          label="Email"
          errors={error ? [error.message] as string[] : undefined}
          placeholder="Email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          value={field.value}
          onChangeText={field.onChange}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
      )}
    />
    <Controller
      control={control}
      name="password"
      render={({ field, fieldState: { error } }) => (
        <TextInput
          ref={passwordInputRef}
          label="Password"
          errors={error ? [error.message] as string[] : undefined}
          secureTextEntry
          placeholder="Password"
          value={field.value}
          onChangeText={field.onChange}
          onSubmitEditing={onSubmit}
        />
      )}
    />

    <Button onPress={onSubmit}>Connexion</Button>
  </Container>
}

export default SignIn
