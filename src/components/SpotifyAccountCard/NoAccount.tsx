import { useRouter } from "next/navigation"
import CTA from "../basic/Buttons/CTA"

const NoAccount: React.FC = () => {
  const router = useRouter()
  return (
    <CTA 
      first 
      onClick={() => router.push('/api/spotify/authenticate')}
    >
      connect
    </CTA>
  )
}

export default NoAccount 
