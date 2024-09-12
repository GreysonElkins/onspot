import style from './Buttons.module.scss'

type Props = React.DetailedHTMLProps<
React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
>

interface First extends Props {
  first?: boolean
  second?: false
  third?: false
}

interface Second extends Props {
  first?: false
  second?: boolean
  third?: false
}

interface Third extends Props {
  first?: false
  second?: false
  third?: boolean
}

const CTA: React.FC<First | Second | Third> = ({ 
  first, second, third,
  className, 
  ...props 
}) => {
  const degree = third ? 'third' : (second ? 'second' : 'first')

  const cName = `${style.CTA} ${style[degree]} ${className}`

  return <button { ...props } className={cName} />
}

export default CTA
