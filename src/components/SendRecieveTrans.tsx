import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { useSendTransaction } from 'wagmi'
import { isAddress, parseEther } from "viem"
import { useForm } from "react-hook-form" 
import { toast } from "sonner"

type SendTransactionData = {
    recipientAddress : string ,
    amount : number 
}

const SendRecieveTrans = () => {

    const { register , handleSubmit ,   formState: { errors, isSubmitting },} = useForm<SendTransactionData>()  

    const [ send , setSend ] = useState<boolean>(true)

    const sendTransaction = useSendTransaction()

    const handleTransaction = (data : SendTransactionData) => {

        const isValid = isAddress(data.recipientAddress)
        
        if(!isValid)return toast("Failed to Validate recipient's address")

        const result = sendTransaction.mutate({
            to : `0x${data.recipientAddress.slice(2)}`,
            value : parseEther(data.amount.toString())
        })

        console.log(result)
    }

    useEffect( () => {

        toast(errors.root && errors.root.message)


    } , [errors])


    return  (

        <div className="bg-slate-800/45 rounded-2xl flex flex-col">
            
            <div className="flex w-full">

                <button onClick={() => setSend(!send)} className={` text-lg font-medium px-12 py-4 w-1/2 hover:bg-slate-800/55 rounded-tl-3xl border-b-2 hover:border-b-[#4F46E5] ${ send ? "border-b-[#4F46E5] bg-slate-800/55" : "border-b-transparent" } `}>
                    Send
                </button>                
                
                <button onClick={() => setSend(!send)} className={` text-lg font-medium px-12 py-4 w-1/2 hover:bg-slate-800/55 rounded-tr-3xl border-b-2 hover:border-b-[#4F46E5] ${ !send ? "border-b-[#4F46E5] bg-slate-800/55" : "border-b-transparent" } `}>
                    Recieve                    
                </button>                

            </div>

            { send ? <form onSubmit={handleSubmit(handleTransaction)}>
                        <div className="px-8 py-4 flex flex-col gap-4">
                        

                            <div className="flex flex-col gap-2">

                                <label className="text-md font-space-mono-regular text-white/65" htmlFor="recipientAddress">
                                    Recipient Address
                                </label>

                                <input { ...register("recipientAddress" , { required : "Recipient Address required"})} placeholder="0x....." className="font-space-mono-regular bg-slate-300/10 rounded-md py-2 border-2 hover:border-white/45  px-3 text-white "/>

                            </div>
                            
                            <div className="flex flex-col gap-2">

                                <label className="text-md font-space-mono-regular text-white/65" htmlFor="recipientAddress">
                                    Amount
                                </label>

                                <input { ...register("amount" , { required : "Amount required"})}  placeholder="0.00" type="number" className="font-space-mono-regular bg-slate-300/10 rounded-md py-2 border-2 hover:border-white/45  px-3 text-white "/>

                            </div>

                            <Button type="submit" disabled={isSubmitting} className="flex items-center w-full  bg-[#4F46E5] hover:bg-[#4F46E5]/80" variant={"default"} size={"lg"}>

                                <p className="text-white text-md font-manrope-regular font-semibold ">
                                    Current Transaction
                                </p>

                                <ArrowRight className="size-5 text-white"/>

                            </Button>
                        </div> 
                    </form>

                
                
                

            : ""
            
            }

            
            
        </div>
    )

}

export default SendRecieveTrans