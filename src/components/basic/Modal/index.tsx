import { PropsWithChildren, DetailedHTMLProps, HTMLAttributes } from "react"
import style from './Modal.module.scss'
import Icon from "../Icon"

export interface Props extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>, HTMLDivElement
> {
  open: boolean
  toggle: () => void
  closeButton?: boolean
  overlay?: boolean
}

const Modal: React.FC<Props> = ({ 
  children, 
  open, 
  toggle, 
  overlay, 
  closeButton,
  className,
  ...props 
}) => {
  const Overlay = () => (
    <div 
      className={style.overlay} 
      style={{ background: overlay ? 'black' : 'none' }}
      onClick={toggle}
    />
  )
  
  return (
    <div 
      className={style.Modal}
      style={{ display: open ? 'auto' : 'none' }}
    >
      <Overlay />
      <div 
        className={`${style['modal-body']} ${className}`} 
        {...props}
      >
        { closeButton && (
          <Icon className={style['close-button']}>cancel</Icon>
        )}
        {children}
      </div>
    </div>
  )
}

export default Modal