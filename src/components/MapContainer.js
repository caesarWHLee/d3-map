import { useMapData } from '../hook/useMapData'
import { CollapsibleWrapper } from './collapsible/CollapsibleWrapper'
import { MapControl } from './MapControl'
import styled from 'styled-components'
import EVC from '@readr-media/react-election-votes-comparison'
import { useEffect, useState } from 'react'
import { Infobox } from './infobox/Infobox'
import { SeatsChart } from './seats-chart/SeatsChart'

const DataLoader = EVC.DataLoader
const EVCComponent = EVC.ReactComponent

const InfoboxWrapper = styled(CollapsibleWrapper)`
  width: 320px;
  position: absolute;
  top: 80px;
  left: 48px;
  background-color: white;
`
const SeatsChartWrapper = styled(CollapsibleWrapper)`
  width: 320px;
  position: absolute;
  top: 280px;
  left: 49px;
  background-color: white;
`

export const MapContainer = () => {
  const mapData = useMapData()
  const [data, setData] = useState(null)
  const elections = [
    { type: 'president', infobox: { title: '正副總統' } },
    { type: 'mayor', infobox: { title: '縣市長' } },
    {
      type: 'legislator',
      infobox: { title: '立法委員' },
      seats: { title: '立法委員席次圖' },
    },
    {
      type: 'councilman',
      infobox: { title: '縣市議員' },
      seats: { title: '縣市議員席次圖' },
    },
  ]
  // const election = elections[Math.floor(Math.random() * elections.length)]
  const election = elections[3]

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
      <InfoboxWrapper title={election.infobox.title}>
        <Infobox type={election.type} />
      </InfoboxWrapper>
      {election.seats && (
        <SeatsChartWrapper title={election.seats.title}>
          <SeatsChart />
        </SeatsChartWrapper>
      )}
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
