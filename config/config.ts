import { http, createConfig } from 'wagmi'
import {mainnet , sepolia , arbitrum} from 'wagmi/chains'
import { injected, safe } from 'wagmi/connectors'


export const config = createConfig({
  
    chains: [ mainnet , sepolia , arbitrum ],
  
    connectors: [
        injected(),
        safe()
    ],
    
    transports: {

        [ mainnet.id ]: http(),
        [ arbitrum.id ] : http(),
        [ sepolia.id ] : http()

    },

})