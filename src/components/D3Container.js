import { Map } from './D3Map'
import { useData } from '../hook/useData'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

export const D3Container = () => {
  const data = useData()
  const wrapperRef = useRef(null)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  console.log(dimension.width, dimension.height)
  useEffect(() => {
    if (wrapperRef.current) {
      const { width, height } = wrapperRef.current.getBoundingClientRect()
      console.log(width, height)
      setDimension({
        width,
        height,
      })
    }
  }, [data, wrapperRef.current])

  if (!data) {
    return <pre>Loading...</pre>
  }

  return (
    <Wrapper ref={wrapperRef}>
      <Map width={dimension.width} height={dimension.height} data={data} />
      {/* <Map width={dimension.width / 2} height={dimension.height} data={data} /> */}
    </Wrapper>
  )
}
