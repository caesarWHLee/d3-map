import { useMapData } from '../hook/useMapData'
import { MapControl } from './MapControl'

export const MapContainer = () => {
  const mapData = useMapData()

  if (!mapData) {
    return <p>Loading...</p>
  }

  return <MapControl mapData={mapData} />
}
