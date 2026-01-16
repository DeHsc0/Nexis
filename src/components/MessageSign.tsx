import { PenTool } from "lucide-react";
import { Button } from "./ui/button";

function MessageSign  () {

    return (
        <div className="px-8 py-6 flex flex-col gap-4 bg-slate-800/45 rounded-2xl">
                
            <div className=" flex items-center gap-2">

                <div className="p-2 bg-zinc-700/70 rounded-full w-fit ">
                    <PenTool className="text-[#4F46E5]"/>
                </div>

                <h1 className="text-md font-bold font-manrope-regular">
                    Cryptographic Signing
                </h1>

            </div>

            <p className="text-white/45 font-manrope-regular">
                Prove ownership of your address by signing a message. This action does not incur gas fees
            </p>

            <textarea placeholder="Enter message to sign." className="h-28 bg-zinc-700/50 rounded-2xl border-2 hover:border-white/45  px-3 py-2 text-white "/>

            <Button variant={"outline"} className="font-manrope-regular text-[#4F46E5] border-[#4F46E5] hover:text-[#4F46E5]">Sign Message</Button>
            
        </div>
    )


}

export default MessageSign