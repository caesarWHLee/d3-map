import { D3Container } from './components/D3Container'
import { createGlobalStyle } from 'styled-components'
import { MapContainer } from './components/MapContainer'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`
function App() {
  return (
    <>
      <GlobalStyle />
      <MapContainer />
      {/* <D3Container /> */}
    </>
  )
}

export default App
