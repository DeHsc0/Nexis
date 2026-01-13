
import WalletConnector from "../components/WalletConnector";
import gsap from "gsap/all";
import { useGSAP } from "@gsap/react"
import { useAccount, useReconnect } from "wagmi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

gsap.registerPlugin(useGSAP)

export default function Home () {

    const { reconnect } = useReconnect()

    const { isConnected , isReconnecting  } = useAccount()

    const navigate = useNavigate()

    useEffect( () => {

        if(isConnected){
            
            navigate("/dashboard")
            return

        } else if (!isReconnecting) {

            reconnect()
            return
        }

    } , [ isConnected , isReconnecting ])

    return ( 
    <>
        { !isReconnecting && 
        <>
            <Toaster/>
            <div className="h-screen flex flex-col">
                <div className="bg-linear-to-r from-[#0c0c16] via-[#5046e5] to-[#0c0c16] p-0.5"></div>
                <div className="flex flex-col h-full w-full justify-center align-middle items-center">
                    <div className="flex flex-col justify-center items-center gap-7">
                        <div className="flex items-center gap-3 bg-[#171821] py-2 px-4 rounded-2xl border-2 border-white/40 w-fit">
                            <div className="p-1 w-fit h-fit rounded-4xl bg-emerald-500">
                            </div>
                            <h1 className="text-sm font-space-mono-regular select-none text-white/80">
                            SYSTEM OPERATIONAL
                            </h1>
                        </div>
                        <h1 className="text-white text-8xl font-manrope-regular select-none font-extrabold text-center">
                        DYNAMIC DAPP
                        <p className="block font-manrope-regular bg-linear-to-b from-white select-none to-white/25 bg-clip-text text-transparent"> GATEWAY</p>
                        </h1>
                        <p className="text-white/55 text-md font-medium font-manrope-regular select-none">
                        Seamlessly interact with Ethereum networks via a unified, non-custodial interface.
                        </p>
                        <WalletConnector />
                    </div>
                </div>
            </div>
        </>} 
    </>
 )
}

