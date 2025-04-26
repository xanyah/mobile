import { QueryClientProvider } from "@tanstack/react-query"
import { Signin } from "./screens"
import { queryClient } from "./constants/query-client"

const App = () => {
  return <QueryClientProvider client={queryClient}>
    <Signin />
  </QueryClientProvider>
}

export default App
