import styled from 'styled-components'

const Tooltip = styled.div`
  position: fixed;
  font-size: 16px;
  padding: 10px;
  background-color: #fff;
  font-family: 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei',
    -apple-system, sans-serif;
  display: ${({ show }) => (show ? 'block' : 'none')};
  ${({ coordinate }) =>
    coordinate.length
      ? `
        top: ${coordinate[1] + 30}px;
        left: ${coordinate[0] - 30}px;
      `
      : `
        top: 0;
        left: 0;
      `};
`

export const MapTooltip = ({ tooltip }) => {
  return (
    <Tooltip show={tooltip.show} coordinate={tooltip.coordinate}>
      {tooltip.text}
    </Tooltip>
  )
}
