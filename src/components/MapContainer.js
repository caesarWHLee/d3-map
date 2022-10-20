import { useMapData } from '../hook/useMapData'
import { CollapsibleWrapper } from './collapsible/CollapsibleWrapper'
import { MapControl } from './MapControl'
import styled from 'styled-components'
import EVC from '@readr-media/react-election-votes-comparison'
import { useEffect, useState } from 'react'

const DataLoader = EVC.DataLoader
const EVCComponent = EVC.ReactComponent

const Collapse = styled(CollapsibleWrapper)`
  width: 300px;
  position: absolute;
  top: 30px;
  left: 300px;
  background-color: white;
`

export const MapContainer = () => {
  const mapData = useMapData()
  const [data, setData] = useState(null)

  useEffect(() => {
    let dataLoader = new DataLoader({
      apiOrigin: 'https://whoareyou-gcs.readr.tw/elections',
      year: '2018', // 年份
      type: 'councilMember', // 選舉類型
      area: 'taipeiCity', // 縣市
    })
    const handleError = (errMsg, errObj) => {
      // do something for loading error
      console.log(errMsg, errObj)
    }
    const handleData = (data) => {
      // call React component `setState`
      setData(data)
    }
    dataLoader.addEventListener('error', handleError)
    dataLoader.addEventListener('data', handleData)
    // after register event listener
    // start to load data periodically
    dataLoader.loadDataPeriodically()
    return () => {
      dataLoader.removeEventListener('error', handleError)
      dataLoader.removeEventListener('data', handleData)
      dataLoader = null
    }
  }, [])

  if (!mapData) {
    return <p>Loading...</p>
  }

  return (
    <>
      <MapControl mapData={mapData} />
      <Collapse title={'開票資訊'}>
        {data ? (
          <EVCComponent
            year={2018}
            title="臺北市議員選舉"
            districts={data?.districts || data?.taipeiCity?.districts}
          />
        ) : (
          <div>testing</div>
        )}
      </Collapse>
    </>
  )
}
