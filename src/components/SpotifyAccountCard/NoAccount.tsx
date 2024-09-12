import { useRouter } from "next/navigation"

const NoAccount: React.FC = () => {
  const router = useRouter()
  return (
    <button onClick={() => router.push('/api/spotify/authenticate')}>connect</button>
  )
}

export default NoAccount 
