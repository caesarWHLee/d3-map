import * as d3 from 'd3'
import { useEffect } from 'react'

export const Map = ({
  dimension,
  mapData,
  id,
  mapObject,
  setMapObject,
  setTooltip,
}) => {
  const { currentFeature, countyId, townId, villageId, activeId } = mapObject
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

  const getXYZ = (feature) => {
    if (feature) {
      const bounds = path.bounds(feature)
      const wScale = (bounds[1][0] - bounds[0][0]) / width
      const hScale = (bounds[1][1] - bounds[0][1]) / height
      const z = 0.56 / Math.max(wScale, hScale)

      const centroid = path.centroid(feature)
      const [x, y] = centroid
      return [x, y, z]
    } else {
      // default xyz
      return [width / 2, height / 2, 1]
    }
  }

  const zoom = (duration) => {
    const xyz = getXYZ(currentFeature)
    const g = d3.select(`#${id}-control`)
    g.transition()
      .duration(duration)
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
      .style('stroke-width', '0px')
      .transition()
      .delay(750)
      .duration(0)
      .style('stroke-width', `${0.3 / xyz[2]}px`)
      .selectAll('.villages')
      .attr('d', path.pointRadius(20.0 / xyz[2]))
  }

  useEffect(() => {
    zoom(750)
  }, [currentFeature])

  useEffect(() => {
    zoom(0)
  }, [width, height])

  const countyClicked = (feature) => {
    if (feature) {
      const countyId = feature['properties']['COUNTYCODE']
      console.log('---')
      console.log('county_clicked:')
      console.log('path id is:', `#id-${countyId}`)
      console.log('d is:', feature)
      console.log('---')

      console.log('set countyId = ', countyId)
      setMapObject((mapObject) => ({
        ...mapObject,
        currentFeature: feature,
        countyId,
        townId: '',
        villageId: '',
        activeId: countyId,
      }))
    } else {
      setMapObject((mapObject) => ({
        ...mapObject,
        currentFeature: null,
        countyId: '',
        townId: '',
        villageId: '',
        activeId: '',
      }))
    }
  }
  const townClicked = (feature) => {
    const countyId = feature['properties']['COUNTYCODE']
    const townId = feature['properties']['TOWNCODE']
    console.log('---')
    console.log('town_clicked:')
    console.log('path id is:', `#id-${townId}`)
    console.log('d is:', feature)
    console.log('---')

    setMapObject((mapObject) => ({
      ...mapObject,
      currentFeature: feature,
      countyId,
      townId,
      villageId: '',
      activeId: townId,
    }))
  }
  const villageClicked = (feature) => {
    const countyId = feature['properties']['COUNTYCODE']
    const townId = feature['properties']['TOWNCODE']
    const villageId = feature['properties']['VILLCODE']

    console.log('---')
    console.log('village_clicked:')
    console.log('path id is:', `#id-${villageId}`)
    console.log('d is:', feature)
    console.log('---')

    console.log(
      `countyId = ${countyId}, townId = ${townId}, villageId = ${villageId}`
    )
    setMapObject((mapObject) => ({
      ...mapObject,
      countyId,
      townId,
      villageId,
      activeId: villageId,
    }))
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
              onMouseOver={() =>
                setTooltip((tooltip) => ({
                  ...tooltip,
                  show: true,
                  text: feature['properties']['COUNTYNAME'],
                }))
              }
              onMouseMove={(e) => {
                setTooltip((tooltip) => ({
                  ...tooltip,
                  coordinate: [e.clientX, e.clientY],
                }))
              }}
              onMouseOut={() =>
                setTooltip((tooltip) => ({
                  ...tooltip,
                  show: false,
                  text: '',
                }))
              }
            />
          ))}
        </g>
        <g id={`${id}-towns`}>
          {displayingTowns?.features?.map((feature) => (
            <path
              key={feature.properties.TOWNCODE}
              d={path(feature)}
              id={id}
              data-county-code={feature['properties']['COUNTYCODE']}
              data-town-code={(() => {
                const code = feature['properties']['TOWNCODE']
                return code.slice(code.length - 3, code.length)
              })()}
              fill={!townId && countyId === activeId ? 'lightcoral' : 'white'}
              stroke="gray"
              strokeWidth="0.3"
              onClick={townClicked.bind(null, feature)}
              onMouseOver={() =>
                setTooltip((tooltip) => ({
                  ...tooltip,
                  show: true,
                  text: feature['properties']['TOWNNAME'],
                }))
              }
              onMouseMove={(e) => {
                setTooltip((tooltip) => ({
                  ...tooltip,
                  coordinate: [e.clientX, e.clientY],
                }))
              }}
              onMouseOut={() =>
                setTooltip((tooltip) => ({
                  ...tooltip,
                  show: false,
                  text: '',
                }))
              }
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
              fill={
                !villageId
                  ? townId === activeId
                    ? 'lightcoral'
                    : 'white'
                  : feature['properties']['VILLCODE'] === activeId
                  ? 'lightcoral'
                  : 'white'
              }
              stroke="gray"
              strokeWidth="0.1"
              onClick={villageClicked.bind(null, feature)}
              onMouseOver={() => {
                console.log(feature)
                setTooltip((tooltip) => ({
                  ...tooltip,
                  show: true,
                  text: feature['properties']['VILLNAME'],
                }))
              }}
              onMouseMove={(e) => {
                setTooltip((tooltip) => ({
                  ...tooltip,
                  coordinate: [e.clientX, e.clientY],
                }))
              }}
              onMouseOut={() =>
                setTooltip((tooltip) => ({
                  ...tooltip,
                  show: false,
                  text: '',
                }))
              }
            />
          ))}
        </g>
      </g>
    </svg>
  )
}
