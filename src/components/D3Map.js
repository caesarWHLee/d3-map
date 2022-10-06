import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { select, geoMercator, geoPath } from 'd3'

const SVG = styled.svg``

export const Map = ({ width, height, data }) => {
  const d3Container = useRef(null)
  const once = useRef(0)

  useEffect(() => {
    if (data && d3Container.current && once.current === 0) {
      console.log(data)
      const svg = select(d3Container.current)

      const projection = geoMercator().fitExtent(
        [
          [20, 20],
          [width - 20, height - 20],
        ],
        data
      )
      const path = geoPath(projection)

      svg
        .append('g')
        .selectAll('path')
        .data(data.features)
        .join('path')
        .attr('id', (d) => `id-${d['properties']['COUNTYCODE']}`)
        .attr('data-county-code', (d) => d['properties']['COUNTYCODE'])
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-linejoin', 'round')
        .attr('d', path)

      once.current += 1
    }
  }, [data, width, height])

  return <SVG width={width} height={height} ref={d3Container} />
}
