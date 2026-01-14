import { useAccount, useBalance } from "wagmi"
import { Button } from "./ui/button"
import { Activity } from "lucide-react"
import { useEffect, useState } from "react"


function AssetOverview () {

    const { address } = useAccount()
    const { data , refetch } = useBalance({ address }) 

    const [ currentPrice , setCurrentPrice ] = useState<number | undefined>(0)

    const getCurrentPrice = async () => {
        
        if(!data)return

        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then((res) => res.json())

        const price = response.ethereum.usd * Number(data.value)

        console.log(data.value)

        setCurrentPrice(price)
        
    }

    useEffect( () => {

        getCurrentPrice()

    } , [data])
    
    return (

        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between w-full">
                <div>
                    <h1 className=" text-3xl font-bold font-manroper-regular">
                        Asset Overview
                    </h1>
                    <p className="text-md text-white/60 font-space-mono-bold">
                        REAL-TIME ON CHAIN DATA
                    </p>
                </div>
                <div>
                    <Button onClick={() => refetch()}>Refresh Balance</Button>
                </div>
            </div>

            <div className="grid grid-cols-3 w-full gap-4">

                <div className="flex justify-between items-center col-span-2 border border-white/45 rounded-xl px-6 py-8 bg-linear-to-br from-[#161826] to-[#0C0D15] w-full">
                    
                    <div className="flex-col ">
                        <p className="text-md text-white/60 font-space-mono-bold">
                            TOTAL BALANCE ESTIMATE
                        </p>

                        <h1 className="font-space-mono-bold text-6xl">
                            ${currentPrice}
                        </h1>
                    </div>

                    <Activity className="size-24 text-white/60"/>

                </div>

                <div>
                    

                    
                </div>

            </div>

        </div>

    )

}

export default AssetOverview
