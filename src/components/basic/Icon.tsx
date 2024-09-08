import { HTMLAttributes, DetailedHTMLProps } from 'react'

const Icon: React.FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => (
  <div {...props}>
    <i className={className}>{children}</i>
  </div>
)

export default Icon
