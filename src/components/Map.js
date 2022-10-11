import * as d3 from 'd3'
import { useEffect, useState } from 'react'

export const Map = ({ dimension, mapData, id, mapObject, setMapObject }) => {
  const { xyz, countyId, townId } = mapObject
  const { width, height } = dimension
  const { counties, towns, villages } = mapData
  const projection = d3.geoMercator().fitExtent(
    [
      [0, 0],
      [width, height],
    ],
    counties
  )
  const path = d3.geoPath(projection)

  const displayingTowns = { ...towns }
  displayingTowns.features = displayingTowns.features.filter((feature) => {
    return feature.properties.COUNTYCODE === countyId
  })

  const displayingVillages = { ...villages }
  displayingVillages.features = displayingVillages.features.filter(
    (feature) => {
      return feature.properties.TOWNCODE === townId
    }
  )

  useEffect(() => {
    if (xyz) {
      const zoom = (xyz) => {
        const g = d3.select(`#${id}-control`)
        g.transition()
          .duration(750)
          .attr(
            'transform',
            `translate(${width / 2}, ${height / 2})scale(${xyz[2]})translate(-${
              xyz[0]
            }, -${xyz[1]})`
          )

        g.selectAll([`#${id}-#counties`, `#${id}-towns`, `#${id}-villages`])
          .style('stroke', 'black')
          // .style('stroke-linejoin', 'round')
          // .style('stroke-linecap', 'round')
          // .style('stroke-width', '0px')
          .transition()
          .delay(750)
          .duration(0)
          // .style('stroke-width', `${0.3 / xyz[2]}px`)
          .selectAll('.villages')
          .attr('d', path.pointRadius(20.0 / xyz[2]))
      }
      zoom(xyz)
    }
  }, [xyz])

  const getXYZ = (d) => {
    const bounds = path.bounds(d)
    const wScale = (bounds[1][0] - bounds[0][0]) / width
    const hScale = (bounds[1][1] - bounds[0][1]) / height
    const z = 0.56 / Math.max(wScale, hScale)

    const centroid = path.centroid(d)
    const [x, y] = centroid
    return [x, y, z]
  }

  const countyClicked = (d) => {
    if (d) {
      const xyz = getXYZ(d)
      const countyId = d['properties']['COUNTYCODE']
      console.log('---')
      console.log('county_clicked:')
      console.log('path id is:', `#id-${countyId}`)
      console.log('d is:', d)
      console.log('---')

      console.log('set countyId = ', countyId)
      setMapObject({ xyz, countyId, townId: '' })
    } else {
      const xyz = [width / 2, height / 2, 1]
      setMapObject({ xyz, countyId: '', townId: '' })
    }
  }
  const townClicked = (d) => {
    if (d) {
      const xyz = getXYZ(d)

      const countyId = d['properties']['COUNTYCODE']
      const townId = d['properties']['TOWNCODE']
      console.log('---')
      console.log('town_clicked:')
      console.log('path id is:', `#id-${townId}`)
      console.log('d is:', d)
      console.log('---')

      setMapObject({ xyz, countyId, townId })
    } else {
      console.error('wtf')
    }
  }
  return (
    <svg
      preserveAspectRatio="xMidYMid"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <rect
        className="background"
        id="id-background"
        width={width}
        height={height}
        fill="white"
        onClick={countyClicked.bind(null, null)}
      />
      <g id={`${id}-control`}>
        <g id={`${id}-counties`}>
          {counties.features.map((feature) => (
            <path
              key={feature.properties.COUNTYCODE}
              d={path(feature)}
              id={`id-${feature['properties']['COUNTYCODE']}`}
              data-county-code={feature['properties']['COUNTYCODE']}
              fill="white"
              stroke="gray"
              strokeWidth="0.3"
              strokeLinejoin="round"
              onClick={countyClicked.bind(null, feature)}
            />
          ))}
        </g>
        <g id={`${id}-towns`}>
          {displayingTowns?.features?.map((feature) => (
            <path
              key={feature.properties.TOWNCODE}
              d={path(feature)}
              id={`id-${feature['properties']['TOWNCODE']}`}
              data-county-code={feature['properties']['COUNTYCODE']}
              data-town-code={(() => {
                const code = feature['properties']['TOWNCODE']
                return code.slice(code.length - 3, code.length)
              })()}
              fill="white"
              stroke="gray"
              strokeWidth="0.3"
              onClick={townClicked.bind(null, feature)}
            />
          ))}
        </g>
        <g id={`${id}-villages`}>
          {displayingVillages?.features?.map((feature) => (
            <path
              key={feature.properties.VILLCODE}
              d={path(feature)}
              id={`id-${feature['properties']['VILLCODE']}`}
              data-county-code={feature['properties']['COUNTYCODE']}
              data-town-code={(() => {
                const code = feature['properties']['TOWNCODE']
                return code.slice(code.length - 3, code.length)
              })()}
              data-village-code={(() => {
                const code = feature['properties']['VILLCODE']
                return code.slice(code.length - 3, code.length)
              })()}
              fill="white"
              stroke="gray"
              strokeWidth="0.1"
              onClick={townClicked.bind(null, feature)}
            />
          ))}
        </g>
      </g>
    </svg>
  )
}
