import CustomBtn from "@/components/CustomButton"
import { Wallet, Zap } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAccount, useDisconnect } from "wagmi"

function Dashboard (){

    const { isConnected , isDisconnected  } = useAccount()
    const navigate = useNavigate()
    const { disconnect } = useDisconnect()


    useEffect( () => {

        if(!isConnected || isDisconnected )navigate("/")

    } , [])


    return <>

        <nav className="py-4 px-24 bg-[#0F111B] flex items-center justify-between">

            <div className="flex items-center gap-3">
                <div className="p-2 text-slate-900 bg-white rounded-lg">
                    <Zap/>
                </div>
                <h1 className="text-2xl text- font-bold">
                    NEXIS
                </h1>
            </div> 

            <CustomBtn props={{
                text : "Disconnect",
                icon : Wallet,
                handleClick : () => disconnect()
            }}/>

        </nav>

    </>
    
}

export default Dashboard