import { Map } from './D3Map'
import { useData } from '../hook/useData'

const width = 480
const height = 500

export const D3Container = () => {
  const data = useData()
  if (!data) {
    return <pre>Loading...</pre>
  }

  return (
    <>
      <Map width={width} height={height} data={data} />
      <Map width={width} height={height} data={data} />
    </>
  )
}
