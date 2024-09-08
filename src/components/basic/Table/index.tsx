import { ReactTabulator } from "react-tabulator"
import { ReactTabulatorProps } from "react-tabulator/lib/ReactTabulator"

interface Props extends ReactTabulatorProps {}

const Table: React.FC<Props> = (props) => {
  return <ReactTabulator {...props} />
}

export default Table
