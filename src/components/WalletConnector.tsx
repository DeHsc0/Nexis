import { useAccount, useConnect, useConnectors, type Connector, type CreateConnectorFn } from "wagmi"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet } from "lucide-react"
import { useEffect, useState } from "react"
import CustomBtn from "./CustomButton"
import { useNavigate } from "react-router-dom"

function WalletConnector() {

  const  { connect , error , status } = useConnect()

  const { isConnected } = useAccount()

  const connectors = useConnectors()

  const supportedConnectors = connectors.slice(2)

  const [ loading , setLoading ] = useState<boolean>(false)
  const [ selectedConnector , setSelectedConnector ] = useState<string | undefined >()
  const [open , setOpen ] = useState<boolean>()

  useEffect(() => {

    if(status === "pending")setLoading(true)
    else if (status === "success" || status === "error") {

      setLoading(false)
      setSelectedConnector(undefined)
      setOpen(false)
  
    }

  } , [error , status])
  
  const navigate = useNavigate()

  const handleConnection = (connector : Connector<CreateConnectorFn>) => {

    setSelectedConnector(connector.name)

    connect({ connector })

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CustomBtn props={{
          text : isConnected ? "Dashboard" : "Connect Wallet",
          handleClick : isConnected ? () => navigate("/dashboard") : ()=> setOpen(!open),
          icon : isConnected ? undefined : Wallet
        }}  />
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-7">

      <DialogTitle>Supported Wallet Providers</DialogTitle>

        <div className="flex flex-col gap-5">
          {supportedConnectors.map((el , index) => {

            return <Button onClick={() => handleConnection(el)} className="flex text items-center py-7 text-md" key={index} variant={"outline"} size={"lg"}>
              <span>
                <img src={el.icon || ""} className="size-7"/>
              </span>
              { (loading && el.name === selectedConnector) ? "Connecting..." : el.name}  
            </Button>

          })}
        </div>

      </DialogContent>
    </Dialog>
  )

}   

export default WalletConnector
