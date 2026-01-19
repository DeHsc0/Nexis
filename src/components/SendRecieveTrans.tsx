import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { useAccount, useBalance, useChainId, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { isAddress, parseEther } from "viem"
import { useForm } from "react-hook-form" 
import { toast } from "sonner"
import QRCode from "react-qr-code";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

type SendTransactionData = {
    recipientAddress : string ,
    amount : string 
}

const SendRecieveTrans = ( ) => {

    const { register , handleSubmit ,   formState: { errors, isSubmitting },} = useForm<SendTransactionData>()  

    const [ send , setSend ] = useState<boolean>(true)
    
    const { address } = useAccount()
    
    const { refetch } = useBalance({ address })

    const chainId = useChainId()

    const { sendTransaction , data , error } = useSendTransaction()

    const { isSuccess  , isLoading} = useWaitForTransactionReceipt({

        hash : data

    })

    useEffect( () => {
        
        error && toast(error.message)
        
        if(isSuccess){

            toast("Transaction Successful")
            refetch()
            return
            
        }

        isLoading && toast("Transaction processing")

    } , [ isSuccess , error  , isLoading , refetch])

    const handleAddressCopy = async () => {

        if(!address)return

        try{

            await navigator.clipboard.writeText(address)
            toast("Address copied to clipboard")

        } catch {

            toast("Failed to Copy address")

        }


    }

    const handleTransaction = (data : SendTransactionData) => {

        const isValid = isAddress(data.recipientAddress)
        
        if(!isValid)return toast("Failed to Validate recipient's address")

        toast("Initiating Transaction")

        sendTransaction({
            to : data.recipientAddress as `0x${string}`,
            value : parseEther(data.amount),
            chainId,   
        })



    }

    useEffect( () => {

        if(!errors.root)return

        toast(errors.root.message)


    } , [errors])


    return  (

        <div className="bg-slate-800/45 rounded-2xl flex flex-col ">
            
            <div className="flex w-full">

                <button onClick={() => setSend(true)}  className={` text-lg font-medium px-12 py-4 w-1/2 hover:bg-slate-800/55 rounded-tl-3xl border-b-2 hover:border-b-[#4F46E5] ${ send ? "border-b-[#4F46E5] bg-slate-800/55" : "border-b-transparent" } `}>
                    Send
                </button>                
                
                <button onClick={() => setSend(false)}  className={` text-lg font-medium px-12 py-4 w-1/2 hover:bg-slate-800/55 rounded-tr-3xl border-b-2 hover:border-b-[#4F46E5] ${ !send ? "border-b-[#4F46E5] bg-slate-800/55" : "border-b-transparent" } `}>
                    Recieve                    
                </button>                

            </div>

            { send ? <form onSubmit={handleSubmit(handleTransaction)}>
                        <div className="px-8 py-9.5 flex flex-col gap-4 ">
                        

                            <div className="flex flex-col gap-2">

                                <label className="text-md font-space-mono-regular text-white/65" htmlFor="recipientAddress">
                                    Recipient Address
                                </label>

                                <input  { ...register("recipientAddress" , { required : "Recipient Address required"})} placeholder="0x....." className="font-space-mono-regular bg-slate-300/10 rounded-md py-2 border-2 hover:border-white/45  px-3 text-white "/>

                            </div>
                            
                            <div className="flex flex-col gap-2">

                                <label className="text-md font-space-mono-regular text-white/65" htmlFor="recipientAddress">
                                    Amount
                                </label>

                                <input step={"any"} { ...register("amount" , { required : "Amount required"})}  placeholder="0.00" type="number" className="font-space-mono-regular bg-slate-300/10 rounded-md py-2 border-2 hover:border-white/45  px-3 text-white "/>

                            </div>

                            <Button type="submit" disabled={isSubmitting} className="flex items-center w-full  bg-[#4F46E5] hover:bg-[#4F46E5]/80" variant={"default"} size={"lg"}>

                                <p className="text-white text-md font-manrope-regular font-semibold ">
                                    Current Transaction
                                </p>

                                <ArrowRight className="size-5 text-white"/>

                            </Button>
                        </div> 
                    </form>                

            : <div className="px-5">

                <div className="flex flex-col items-center py-4 gap-5">

                    <div className="p-4 border border-white rounded-2xl h-fit ">

                        { address && <QRCode  level="L"  bgColor="white" value={address} className="size-42"/>}

                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-lg font-space-mono-regular">
                            Your Eth Address:
                        </p>
                        
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <div onClick={handleAddressCopy} className="rounded-lg border select-none hover:border-[#5046e5] cursor-pointer border-white/30 bg-slate-800/60 px-4 py-3 font-space-mono-regular text-sm text-white">
                                    <p>
                                        {address}
                                    </p>
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent align="end">
                                <h1>
                                    Click to Copy
                                </h1>
                            </HoverCardContent>
                        </HoverCard>

                    </div>

                </div>                

            </div>
            
            }

            
            
        </div>
    )

}

export default SendRecieveTrans