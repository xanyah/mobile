import { useEffect } from "react"
import { validateToken } from "../../api/auth"
import { useNavigation } from "@react-navigation/native"

const InitialLoading = () => {
  const navigation = useNavigation()

  useEffect(() => {
    validateToken()
      .then(() => navigation.reset({key: '0', 'routes': [{name: 'MainBottomTabNavigator'}]}))
      .catch(() => navigation.reset({key: '0', 'routes': [{name: 'SignIn'}]}))
  }, [])

  return null
}

export default InitialLoading
