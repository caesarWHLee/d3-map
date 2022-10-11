import styled from 'styled-components'

const Button = styled.button`
  position: absolute;
  top: 50px;
  left: 50px;
  font-size: 12px;

  display: inline-block;
  border: none;
  margin: 0;
  text-decoration: none;
  background-color: gray;
  color: #ffffff;
  font-family: sans-serif;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover {
    background: lightgray;
    color: white;
  }
`

export const MapCompareButton = ({ compareMode, onCompareModeChange }) => {
  return (
    <Button onClick={onCompareModeChange}>
      {compareMode ? 'cancel' : 'compare'}
    </Button>
  )
}
