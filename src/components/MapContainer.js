import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useMapData } from '../hook/useMapData'
import { Map } from './Map'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

export const MapContainer = () => {
  const [dimension, setDimension] = useState(null)
  const mapData = useMapData()
  const wrapperRef = useCallback((node) => {
    if (!node) console.error('wtf the node is', node)
    const { width, height } = node.getBoundingClientRect()
    setDimension({
      width,
      height,
    })
  }, [])

  if (!mapData) {
    return <p>Loading...</p>
  }

  return (
    <Wrapper ref={wrapperRef}>
      {dimension && <Map dimension={dimension} mapData={mapData} />}
    </Wrapper>
  )
}
