import { useMapData } from '../hook/useMapData'
import { CollapsibleWrapper } from './collapsible/CollapsibleWrapper'
import { MapControl } from './MapControl'
import styled from 'styled-components'
import EVC from '@readr-media/react-election-votes-comparison'
import { useEffect, useState } from 'react'
import { Infobox } from './infobox/Infobox'

const DataLoader = EVC.DataLoader
const EVCComponent = EVC.ReactComponent

const Collapse1 = styled(CollapsibleWrapper)`
  width: 320px;
  position: absolute;
  top: 193px;
  left: 48px;
  background-color: white;
`
const Collapse2 = styled(CollapsibleWrapper)`
  width: 300px;
  position: absolute;
  top: 30px;
  left: 500px;
  background-color: white;
`

export const MapContainer = () => {
  const mapData = useMapData()
  const [data, setData] = useState(null)
  const elections = [
    { type: 'president', title: '正副總統' },
    { type: 'mayor', title: '縣市長' },
    { type: 'legislator', title: '立法委員' },
    { type: 'councilman', title: '縣市議員' },
  ]
  const election = elections[Math.floor(Math.random() * elections.length)]
  // useEffect(() => {
  //   let dataLoader = new DataLoader({
  //     apiOrigin: 'https://whoareyou-gcs.readr.tw/elections',
  //     year: '2018', // 年份
  //     type: 'councilMember', // 選舉類型
  //     area: 'taipeiCity', // 縣市
  //   })
  //   const handleError = (errMsg, errObj) => {
  //     // do something for loading error
  //     console.log(errMsg, errObj)
  //   }
  //   const handleData = (data) => {
  //     // call React component `setState`
  //     setData(data)
  //   }
  //   dataLoader.addEventListener('error', handleError)
  //   dataLoader.addEventListener('data', handleData)
  //   // after register event listener
  //   // start to load data periodically
  //   dataLoader.loadDataPeriodically()
  //   return () => {
  //     dataLoader.removeEventListener('error', handleError)
  //     dataLoader.removeEventListener('data', handleData)
  //     dataLoader = null
  //   }
  // }, [])

  if (!mapData) {
    return <p>Loading...</p>
  }

  return (
    <>
      <MapControl mapData={mapData} />
      <Collapse1 title={election.title}>
        <Infobox type={election.type} />
      </Collapse1>
      {/* <Collapse2 title={'開票資訊'}>
        {data ? (
          <EVCComponent
            year={2018}
            title="臺北市議員選舉"
            districts={data?.districts || data?.taipeiCity?.districts}
          />
        ) : (
          <div>testing</div>
        )}
      </Collapse2> */}
    </>
  )
}
