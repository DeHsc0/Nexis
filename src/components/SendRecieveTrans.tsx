import { useState } from "react"

const SendRecieveTrans = () => {

    const [ send , setSend ] = useState<boolean>(true)

    return  (

        <div className="bg-slate-800/45 rounded-tl-3xl rounded-tr-3xl flex flex-col">
            
            <div className=" flex w-full">

                <button className="text-lg font-medium  px-12 py-4 w-1/2 hover:bg-slate-800/80 rounded-tl-3xl">
                    Send
                </button>                
                
                <button className="text-lg px-12 py-4 w-1/2 hover:bg-slate-800/80 rounded-tr-3xl">
                    Recieve                    
                </button>                

            </div>

            <div className="px-8 py-4">

                <label className="text-md font-space-mono-regular" htmlFor="recipientAddress">
                    Recipient Address
                </label>
                

            </div>

            
            
        </div>
    )

}

export default SendRecieveTrans