
import { Button } from "@/components/ui/button"
import { Wallet, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAccount, useChains, useDisconnect, useSwitchChain } from "wagmi"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Chain } from "viem"
import AssetOverview from "@/components/AssetOverview"
import { toast } from "sonner"

function Dashboard (){

    const { isConnected , isDisconnected  } = useAccount()
    
    const navigate = useNavigate()

    const { disconnect } = useDisconnect()

    const switchChain = useSwitchChain()
        
    const chains = useChains()

    const [ selectedChain , setSelectedChain ] = useState<Chain | undefined>(chains.find((chain ) => chain.name === "Ethereum" ) ?? chains[0] )

    const handleValueChange = ( value : string ) => {

        const choosedChain = chains.find((chain) => chain.name === value)

        if(!choosedChain)return

        switchChain.mutate({ chainId :  choosedChain.id } , { 

            onSuccess : () => setSelectedChain(choosedChain),
            onError : (error) => toast(`Failed to Switch chain : ${error.message}`)

        })

    }    

    useEffect( () => {

        if(!isConnected || isDisconnected )navigate("/")

    } , [])


    return <>

        <nav className="py-5 px-24 bg-slate-900/45 flex items-center justify-between">

            <div className="flex items-center gap-3">
                <div className="p-2 text-slate-900 bg-white rounded-lg">
                    <Zap/>
                </div>
                <h1 className="text-2xl font-manrope-regular font-bold">
                    NEXIS
                </h1>
            </div> 

            <div className="flex items-center gap-4">
                <Select defaultValue={selectedChain && selectedChain.name} onValueChange={(value : string) => handleValueChange(value) }>
                    <SelectTrigger className="w-45">
                        <SelectValue placeholder="Select Network"></SelectValue>
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup  >
                            <SelectLabel>Networks</SelectLabel>

                            {
                                chains.map( (chain) => {
                                    
                                    return <SelectItem key={chain.id} value={chain.name}>{chain.name === "Ethereum" ?  "Mainnet" : chain.name}</SelectItem>

                                })
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button onClick={() => disconnect()} className="" size={"lg"} variant={"outline"}>
                    <Wallet/>
                    Disconnect Wallet
                </Button>
            </div>


        </nav>

        <main className="px-24 flex my-8">

            <AssetOverview/>

        </main>
        

    </>
    
}

export default Dashboard