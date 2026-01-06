
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from "../config/config"
import WalletConnector from './components/WalletConnector'
const queryClient = new QueryClient()

function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        <div className="h-screen flex flex-col">
          <footer className="bg-linear-to-r from-[#0c0c16] via-[#5046e5] to-[#0c0c16] p-0.5"></footer>
          <div className="flex h-full w-full justify-center align-middle items-center">
            <div className="flex flex-col justify-center items-center gap-7">
              <div className="flex items-center gap-3 bg-[#171821] py-2 px-4 rounded-2xl border-2 border-white/40 w-fit">
                  <div className="p-1 w-fit h-fit rounded-4xl bg-emerald-500">
                  </div>
                  <h1 className="text-sm font-space-mono-regular select-none text-white/80">
                    SYSTEM OPREATIONAL
                  </h1>
              </div>
              <h1 className="text-white text-8xl font-manrope-regular select-none font-extrabold text-center">
                DYNAMIC DAPP
                <p className="block font-manrope-regular bg-linear-to-b from-white select-none to-white/25 bg-clip-text text-transparent"> GATEWAY</p>
              </h1>
              <p className="text-white/55 text-xl font-medium font-manrope-regular select-none">
                Seamlessly interact with Ethereum networks via a unified, non-custodial interface.
              </p>
            </div>
            <WalletConnector/>
          </div>
        </div> 
      </QueryClientProvider> 
    </WagmiProvider>
  )
}

export default App 