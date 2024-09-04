import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import style from './Buttons.module.scss'

const IconButton: React.FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ className, children, ...props }) => (
  <button
    className={style.IconButton} 
    {...props}
  >
    <i className={className}>{children}</i>
  </button>
)

export default IconButton
