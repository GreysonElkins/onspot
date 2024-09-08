import { ColumnDefinition } from "react-tabulator"
import { artistsFormatter, dateFormatter } from "@/components/basic/Table/columnFormatters"
const columns: ColumnDefinition[] = [
  { title: 'Track', field: 'track.name' },
  { title: 'Artist', field: 'track.artists', formatter: artistsFormatter },
  { title: 'Album', field: 'track.album.name' },
  { title: 'Date Added', field: 'added_at', formatter: dateFormatter },
  { title: 'Popularity', field: 'track.popularity' },
]

export default columns
