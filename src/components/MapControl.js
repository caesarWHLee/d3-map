import { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Map } from './Map'
import { MapCompareButton } from './MapCompareButton'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

const defaultMapObject = {
  xyz: null,
  countyId: '',
  townId: '',
}

export const MapControl = ({ mapData }) => {
  const [dimension, setDimension] = useState(null)
  const [mapObject, setMapObject] = useState(defaultMapObject)
  const [compareMode, setCompareMode] = useState(false)
  const wrapperRef = useCallback((node) => {
    if (!node) console.error('wtf the node is', node)
    const { width, height } = node.getBoundingClientRect()
    setDimension({
      width,
      height,
    })
  }, [])

  if (compareMode) {
    const splitDimension = {
      width: dimension.width / 2,
      height: dimension.height,
    }

    return (
      <Wrapper ref={wrapperRef}>
        {dimension && (
          <>
            <Map
              dimension={splitDimension}
              mapData={mapData}
              id="first"
              mapObject={mapObject}
              setMapObject={setMapObject}
            />
            <Map
              dimension={splitDimension}
              mapData={mapData}
              id="second"
              mapObject={mapObject}
              setMapObject={setMapObject}
            />
          </>
        )}
        <MapCompareButton
          compareMode={compareMode}
          onCompareModeChange={() => {
            setCompareMode((v) => !v)
            setMapObject(defaultMapObject)
          }}
        />
      </Wrapper>
    )
  } else {
    return (
      <Wrapper ref={wrapperRef}>
        {dimension && (
          <Map
            dimension={dimension}
            mapData={mapData}
            id="first"
            mapObject={mapObject}
            setMapObject={setMapObject}
          />
        )}
        <MapCompareButton
          compareMode={compareMode}
          onCompareModeChange={() => {
            setCompareMode((v) => !v)
            setMapObject(defaultMapObject)
          }}
        />
      </Wrapper>
    )
  }
}
