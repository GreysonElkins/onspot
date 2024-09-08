// import Tabulator from "tabulator"
import { Artist } from '@/types/Spotify'
import { format } from 'date-fns'

// cell is very close to Tabulator.CellComponent

export const artistsFormatter = (cell: any) => 
  cell.getValue().map(({ name }: Artist) => name).join(', ') as string

export const dateFormatter = (cell: any) => 
  format(cell.getValue(), 'MMM do, yyyy')
