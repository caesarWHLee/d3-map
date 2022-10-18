import { useMapData } from '../hook/useMapData'
import { CollapsibleWrapper } from './collapsible/CollapsibleWrapper'
import { MapControl } from './MapControl'
import styled from 'styled-components'

const Collapse = styled(CollapsibleWrapper)`
  width: 300px;
  position: absolute;
  top: 30px;
  left: 300px;
  background-color: white;
`

export const MapContainer = () => {
  const mapData = useMapData()

  if (!mapData) {
    return <p>Loading...</p>
  }

  return (
    <>
      <MapControl mapData={mapData} />
      <Collapse title={'開票資訊'}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget
          efficitur mauris. Cras accumsan metus non erat mattis feugiat. Fusce
          cursus, ligula eu convallis dapibus, est justo laoreet diam, non
          finibus sem neque in quam. Vivamus sit amet velit ultrices, dignissim
          dolor vitae, vulputate magna. Suspendisse potenti. Proin aliquam
          tempor ligula at elementum. Sed vitae placerat diam. Pellentesque
          vehicula elementum magna, in pellentesque massa accumsan quis.
          Pellentesque efficitur pulvinar viverra. Sed non nibh semper,
          efficitur est ut, mollis diam. Aliquam erat volutpat. Vestibulum
          ornare lacus eget libero accumsan commodo. Phasellus convallis tempus
          diam, id dignissim mauris ultricies ac. In sem quam, auctor id tellus
          ac, interdum bibendum libero. Vestibulum euismod libero at accumsan
          pharetra. Etiam non pellentesque ligula. Sed turpis arcu, tempor sit
          amet risus id, dapibus accumsan magna. Aenean leo massa, suscipit ut
          imperdiet eu, laoreet sit amet mauris. Phasellus at nibh aliquet,
          semper mi in, posuere turpis. Donec vitae est finibus, vehicula arcu
          eu, gravida arcu. Nunc vitae velit laoreet, vehicula leo sit amet,
        </div>
      </Collapse>
    </>
  )
}
