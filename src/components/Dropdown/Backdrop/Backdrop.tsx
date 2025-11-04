import { motion } from "framer-motion"
import { ReactNode } from "react"

interface BackdropProps {
  children: ReactNode;
  onClick: () => void;
}

export default function Backdrop({ children, onClick }: BackdropProps) {
  return (
    <motion.div
      onClick={onClick}
      className="bg-black/90 w-[100vw] right-[0px] h-[100vh] sm:h-[1100px] absolute z-10 sm:fixed sm:overflow-y-scroll sm:top-[90px] sm:bottom-0 sm:left:0 right:0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}
