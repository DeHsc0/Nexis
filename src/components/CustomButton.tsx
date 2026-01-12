
import gsap from "gsap"
import { useRef, type ForwardRefExoticComponent, type RefAttributes} from "react"
import { type LucideProps } from "lucide-react"

function CustomBtn( {props} : { props : { text : string , icon ?:  ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> , handleClick : () => void , image ?: string}} ) {


  const bgRef = useRef<HTMLSpanElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
   
    if (!bgRef.current) return

    const rect = e.currentTarget.getBoundingClientRect()


    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    gsap.to(bgRef.current, {
      x: x - 70,
      y: y - 26,
      ease: "power2.out",
      duration: 0.5,
      scale : x > 100 || x < 30 ? 8 : 4
      
    })

  }

  const handleMouseLeave = () => {
    if (!bgRef.current) return

    gsap.to(bgRef.current, {
      scale: 0,
      duration: 0.5,
      ease: "power2.out",
    })
  }

  const handleMouseEnter = () => {

    if (!bgRef.current) return

    gsap.to(bgRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    })
  }

  const handleMouseUp = () => {

    gsap.to(buttonRef.current , {

      scale : 1

    })

  }
  const handleMouseDown = () => {

    gsap.to(buttonRef.current , {

      scale : 0.9

    })

  }
  

 
  return (
   
      <button
        ref={buttonRef}
        onClick={props.handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden flex items-center justify-center border-2 text-white border-white px-4 py-2 hover:text-black rounded-2xl">
        <span
          ref={bgRef}
          className="absolute w-8 h-8 bg-white rounded-full pointer-events-none z-0 scale-0"
        />
        <span className="relative z-10 flex items-center gap-2">
        {props.icon && <props.icon className="hover:text-black"/>}
        { props.image && <img src={props.image}/>}
          {props.text}
        </span>
      </button>
  )
}

export default CustomBtn
