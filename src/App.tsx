
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from "../config/config"
import { ThemeProvider } from './components/theme-provider'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

const queryClient = new QueryClient()

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <WagmiProvider config={config} reconnectOnMount={false}>
        <QueryClientProvider client={queryClient} > 
            <RouterProvider router={router}/>
        </QueryClientProvider> 
      </WagmiProvider>
    </ThemeProvider>
  )
}

export default App 