import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import { feature } from 'topojson'

const SVG = styled.svg``

let state = {
  map: {
    currentLocation: {
      level: '',
      id: '',
    },
    previousLocationId: 'background',
  },
}

export const Map = ({ width, height, data }) => {
  const d3Container = useRef(null)
  const once = useRef(1)

  useEffect(() => {
    if (data && d3Container.current && width !== 0) {
      console.log(data, width, height)
      const svg = d3
        .select(d3Container.current)
        .attr('preserveAspectRatio', 'xMidYMid')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('width', width)
        .attr('height', height)

      const projection = d3.geoMercator().fitExtent(
        [
          [0, 0],
          [width, height],
        ],
        data
      )
      const path = d3.geoPath(projection)
      let county, town
      svg
        .append('rect')
        .attr('class', 'background')
        .attr('id', 'id-background')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'yellow')
        .on('click', countyClicked)

      const g = svg.append('g')

      g.append('g')
        .attr('id', 'counties')
        .selectAll('path')
        .data(data.features)
        .join('path')
        .attr('id', (d) => `id-${d['properties']['COUNTYCODE']}`)
        .attr('data-county-code', (d) => d['properties']['COUNTYCODE'])
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-linejoin', 'round')
        .attr('d', path)
        .on('click', countyClicked)

      once.current = 0

      function zoom(xyz) {
        g.transition()
          .duration(750)
          .attr(
            'transform',
            `translate(${width / 2}, ${height / 2})scale(${xyz[2]})translate(-${
              xyz[0]
            }, -${xyz[1]})`
          )
        g.selectAll(['#counties', '#towns', '#villages'])
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

      function getXYZ(d) {
        const bounds = path.bounds(d)
        const wScale = (bounds[1][0] - bounds[0][0]) / width
        const hScale = (bounds[1][1] - bounds[0][1]) / height
        const z = 0.56 / Math.max(wScale, hScale)

        const centroid = path.centroid(d)
        const [x, y] = centroid
        return [x, y, z]
      }

      function countyClicked(e, d) {
        g.selectAll(['#towns', '#villages']).remove()
        town = null

        if (d) {
          console.log('d', d)
          const xyz = getXYZ(d)

          county = d

          const countyId = d['properties']['COUNTYCODE']
          console.log('countyId', countyId)
          {
            //simulate mutation
            state.map.currentLocation.level = 'county'
            state.map.currentLocation.id = countyId
          }
          // fetch data
          console.log('---')
          console.log('county_clicked:')
          console.log('path id is:', `#id-${countyId}`)
          console.log('d is:', d)
          console.log('---')
          {
            //simulate mutation
            state.map.previousLocationId = 'background'
          }

          d3.json(
            'https://cdn.jsdelivr.net/npm/taiwan-atlas/towns-10t.json'
          ).then((topojsonData) => {
            // process geoJson in corresponding to countyId
            console.log(topojsonData)
            const { towns } = topojsonData.objects
            const data = feature(topojsonData, towns)
            data.features = data.features.filter(
              (feature) => feature.properties.COUNTYCODE == countyId
            )
            console.log(data)

            g.append('g')
              .attr('id', 'towns')
              .selectAll('path')
              .data(data.features)
              .join('path')
              .attr('id', (d) => `id-${d['properties']['TOWNCODE']}`)
              .attr('data-county-code', (d) => d['properties']['COUNTYCODE'])
              .attr('data-town-code', (d) => {
                const code = d['properties']['TOWNCODE']
                return code.slice(code.length - 3, code.length)
              })
              .attr('class', 'active')
              .attr('fill', 'blue')
              .attr('d', path)
              .on('click', townClicked)

            zoom(xyz)
          })
        } else {
          const xyz = [width / 2, height / 2, 1]
          county = null
          {
            state.map.currentLocation.level = 'tw'
            state.map.currentLocation.id = ''
          }
          zoom(xyz)
        }
      }

      function townClicked(e, d) {
        g.selectAll('#villages').remove()
        g.selectAll('.active').classed('active', false)

        if (d) {
          var xyz = getXYZ(d)
          town = d

          const countyId = d['properties']['COUNTYCODE']
          const townId = d['properties']['TOWNCODE']
          {
            //simulate mutation
            state.map.currentLocation.level = 'town'
            state.map.currentLocation.id = townId
          }
          console.log('---')
          console.log('town_clicked:')
          console.log('path id is:', `#id-${townId}`)
          console.log('d is:', d)
          console.log('---')
          {
            //simulate mutation
            state.map.previousLocationId = countyId
          }

          d3.json(
            'https://cdn.jsdelivr.net/npm/taiwan-atlas/villages-10t.json'
          ).then((topojsonData) => {
            // process geoJson in corresponding to countyId
            console.log(topojsonData)
            const { villages } = topojsonData.objects
            const data = feature(topojsonData, villages)
            data.features = data.features.filter(
              (feature) => feature.properties.TOWNCODE === townId
            )
            console.log(data)

            g.append('g')
              .attr('id', 'towns')
              .selectAll('path')
              .data(data.features)
              .join('path')
              .attr('id', (d) => `id-${d['properties']['TOWNCODE']}`)
              .attr('data-county-code', (d) => d['properties']['COUNTYCODE'])
              .attr('data-town-code', (d) => {
                const code = d['properties']['TOWNCODE']
                return code.slice(code.length - 3, code.length)
              })
              .attr('class', 'active')
              .attr('fill', 'red')
              .attr('d', path)
              .on('click', townClicked)

            zoom(xyz)
          })
        } else {
          const xyz = [width / 2, height / 2, 1]
          county = null
          {
            state.map.currentLocation.level = 'tw'
            state.map.currentLocation.id = ''
          }
          zoom(xyz)
        }
      }
    }
  }, [data, width, height])

  return <SVG ref={d3Container} />
}
