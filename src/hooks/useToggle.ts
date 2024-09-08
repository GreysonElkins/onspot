import { useState } from "react"

type Params = {
  default?: boolean
}

const useToggle = (params?: Params) => {
  const [is, setIs] = useState<boolean>(params?.default || false)

  const toggle = () => setIs(prev => !prev)

  return ({ is, toggle, setIs })
}

export default useToggle
