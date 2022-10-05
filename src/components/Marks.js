import {geoMercator, geoPath, geoNaturalEarth1} from 'd3'
import styled from 'styled-components'

const projection = geoNaturalEarth1()
const path = geoPath(projection)

const MarksWrapper = styled.g`
.land {
  fill: #137B80;
}
.sphere {
  fill: #ececec;
}
.interiors {
  fill: none;
  stroke: #43A4A8;
}
.graticules {
  fill: none;
  stroke: #dadada;
}
`

export const Marks = ({data}) => {
  console.log(data)

  return (
  <MarksWrapper className="marks">
    {data.features.map(feature => (
      <path className='land' d={path(feature)} key={feature.properties.COUNTYCODE} />
    ))}
  </MarksWrapper>
)}