import { default as ModalComponent, Props } from "@/components/basic/Modal"
import useToggle from "./useToggle"

type ModalProps = Omit<Props, 'open'|'toggle'>

const useModal = () => {
  const { is, toggle, setIs } = useToggle()

  const Modal = (props: ModalProps) => (
    <ModalComponent 
      open={is} 
      toggle={toggle} 
      {...props} 
    />
  )

  return { Modal, open: () => setIs(true) }
}

export default useModal
