'use client'
import { useEffect, useState } from "react"

import Table from "@/components/basic/Table"
import { usePaginatedApi } from "@/hooks"
import { TrackResponse } from "@/types/Spotify"
import columns from "./columns"

const LikedSongs: React.FC = () => {
  const [totalSongs, setTotalSongs] = useState<number | undefined>(undefined)
  const { data, next, prev } = usePaginatedApi<TrackResponse>({
    total: totalSongs,
    url: process.env.NEXT_PUBLIC_BASE_URL + '/api/spotify/me/tracks'
  })
  
  useEffect(() => { 
    if (!data) return
    setTotalSongs(data.total)
  }, [data])
  
  return (
    <div>
      <Table columns={columns} data={data?.items} 
      />
      <button onClick={prev}>previous</button>
      <button onClick={next}>next</button>
    </div>
  )
}

export default LikedSongs
