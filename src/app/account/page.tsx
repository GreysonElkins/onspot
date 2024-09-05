"use client"
import { useRouter } from "next/navigation"

const Account = () => {
  const router = useRouter()

  return (
    <div>
      <div className="Card">
        <h2>Spotify</h2>
        <hr />
        <button onClick={() => router.push('/api/auth/spotify')}>connect</button>
      </div>
    </div>
  )
}

export default Account
