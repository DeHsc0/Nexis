import { useChains, useConnections, useSwitchChain, useSwitchConnection } from "wagmi"

function WalletConnector () {

    const switchChain = useSwitchChain()
    const chains = useChains()

    const switchConnection = useSwitchConnection()
  const connections = useConnections()

    console.log({ chains , connections })

    return (
        <>
            <h1>Hello world</h1>
        </>
    )
}

export default WalletConnector