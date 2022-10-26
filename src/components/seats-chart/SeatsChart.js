import { mockData as councilmanSeats } from '../../mock-datas/seats-distribution/councilmen/2018_councilmen_county_63000'
import styled from 'styled-components'
import { partiesColor } from '../../consts/parties-color'
import { useState } from 'react'

const SeatsChartWrapper = styled.div`
  font-size: 24px;
  line-height: 29px;
`

const SeatsChartYear = styled.div`
  padding: 18px 0 6px;
  text-align: center;
`

const SeartsChartTitle = styled.div`
  padding: 20px 0;
  text-align: center;
  background-color: #afafaf;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 40px 39px 74px;
`

const SeatWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`

const Seat = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ bgColor }) => bgColor || '#fff'};
  border: solid 1px #000;
  border-radius: 50%;
`

const SeatInfo = styled.div`
  position: fixed;
  border-radius: 6px;
  max-width: 68px;
  padding: 4px;
  background-color: #000;
  color: #fff;
  font-size: 12px;
  line-height: 17.8px;
  top: 501px;
  left: 91px;

  ${({ coordinate }) =>
    coordinate.length
      ? `
      top: ${coordinate[1]}px;
      left: ${coordinate[0]}px;
    `
      : `
      top: 0;
      left: 0;
    `}
`

export const SeatsChart = () => {
  const [hoverParty, setHoverParty] = useState({
    show: false,
    party: '',
    coordinate: [],
  })
  return (
    <SeatsChartWrapper>
      <SeatsChartYear>2018</SeatsChartYear>
      <SeartsChartTitle>臺北市議員選舉</SeartsChartTitle>
      <Wrapper>
        {hoverParty.show && (
          <SeatInfo coordinate={hoverParty.coordinate}>
            {hoverParty.party}
          </SeatInfo>
        )}
        {councilmanSeats.parties.reduce((total, party) => {
          let color = '#d9d9d9'
          const partyColor = partiesColor.find(
            (partyColor) => partyColor.name === party.short
          )
          if (partyColor) {
            color = partyColor.color
          }
          return total.concat(
            [...Array(party.seats)].map((empty, i) => {
              return (
                <SeatWrapper
                  key={party.short + i}
                  onMouseOver={(e) => {
                    setHoverParty((value) => ({
                      ...value,
                      show: true,
                      party: party.label,
                    }))
                  }}
                  onMouseMove={(e) => {
                    setHoverParty((value) => ({
                      ...value,
                      coordinate: [e.clientX + 15, e.clientY],
                    }))
                  }}
                  onMouseLeave={() => {
                    setHoverParty({
                      show: false,
                      party: '',
                      coordinate: [],
                    })
                  }}
                >
                  <Seat bgColor={color} />
                </SeatWrapper>
              )
            })
          )
        }, [])}
      </Wrapper>
    </SeatsChartWrapper>
  )
}
