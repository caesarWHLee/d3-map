import { mockData as presidentMockData } from '../../mock-datas/maps/presidents/2020_president_country'
import { mockData as mayorMockData } from '../../mock-datas/maps/mayors/2022_mayor_country'
import { mockData as legislatorMockData } from '../../mock-datas/maps/legislators/2020_legislator_county_63000'
import { mockData as councilmanMockData } from '../../mock-datas/maps/councilmen/2018_councilmen_county_63000'
import ElectedSVG from '../../images/elected.svg'
import styled from 'styled-components'

const InfoboxWrapper = styled.div`
  font-family: 'Noto Sans TC', sans-serif;
  padding: 16px 22px;
  font-size: 18px;
  height: 130px;
  overflow: auto;
`

const InfoboxScrollWrapper = styled.div``

const PresidentTitle = styled.p`
  margin: 0 0 20px;
  font-weight: 700;
`

const PresidentCandidate = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  font-weight: 700;
  line-height: 26px;
  ${({ elected }) => elected && 'color: green;'}
`

const InfoboxText = styled.p`
  margin: 0;
`

const ElectedIcon = styled.img`
  margin-left: 14px;
`

const PresidentInfobox = ({ level, profRate, candidates }) => {
  return (
    <InfoboxScrollWrapper>
      <PresidentTitle>
        {level === 1 && '總'}投票率 {profRate}%
      </PresidentTitle>
      {candidates.map((candidate) => {
        const elected = candidate.candVictor === '*'
        return (
          <PresidentCandidate elected={elected} key={candidate.canNo}>
            {candidate.name} {candidate.party} {candidate.tksRate}%
            {elected && <ElectedIcon src={ElectedSVG} alt="elected" />}
          </PresidentCandidate>
        )
      })}
    </InfoboxScrollWrapper>
  )
}

const MayorTitle = styled.p`
  margin: 0 0 20px;
  font-weight: 700;
`

const MayorCandidate = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  font-weight: 700;
  line-height: 26px;
  ${({ elected }) => elected && 'color: green;'}
`

const MayorInfobox = ({ level, profRate, candidates }) => {
  if (level === -1) {
    return (
      <InfoboxScrollWrapper>
        <InfoboxText>點擊地圖看更多資料</InfoboxText>
      </InfoboxScrollWrapper>
    )
  }
  return (
    <InfoboxScrollWrapper>
      <MayorTitle>
        {level === 1 && '總'}投票率 {profRate}%
      </MayorTitle>
      {candidates.map((candidate) => {
        const elected = candidate.candVictor === '*'
        return (
          <MayorCandidate elected={elected} key={candidate.canNo}>
            {candidate.name} {candidate.party} {candidate.tksRate}%
            {elected && <ElectedIcon src={ElectedSVG} alt="elected" />}
          </MayorCandidate>
        )
      })}
    </InfoboxScrollWrapper>
  )
}

const LegislatorDistrict = styled.div`
  padding: 20px 0;
  border-top: 1px solid #000;
  &:first-of-type {
    border-top: unset;
    padding-top: unset;
  }
  &:last-of-type {
    padding-bottom: unset;
  }
`
const LegislatorConstituency = styled.div`
  font-size: 17px;
  color: gray;
`

const LegislatorTitle = styled.div`
  margin-bottom: 20px;
  font-weight: 700;
`

const LegislatorCandidate = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  line-height: 26px;
  ${({ elected }) => elected && 'color: green;'}
`

const LegislatorInfobox = ({ level, profRate, districts }) => {
  if (level === -1) {
    return (
      <InfoboxScrollWrapper>
        <InfoboxText>點擊地圖看更多資料</InfoboxText>
      </InfoboxScrollWrapper>
    )
  }
  return (
    <InfoboxScrollWrapper>
      {districts.map(({ county, area, range, candidates }) => {
        const legislatorIdPrefix = county + area
        const constituency = range.split(' ')[1]
        const candidateComps = candidates.map((candidate) => {
          const elected = candidate.candVictor === '*'
          return (
            <LegislatorCandidate
              elected={elected}
              key={legislatorIdPrefix + candidate.canNo}
            >
              {candidate.name} {candidate.party} {candidate.tksRate}%
              {elected && <ElectedIcon src={ElectedSVG} alt="elected" />}
            </LegislatorCandidate>
          )
        })
        return (
          <LegislatorDistrict key={legislatorIdPrefix}>
            <LegislatorConstituency>{constituency}</LegislatorConstituency>
            <LegislatorTitle>投票率 {profRate}%</LegislatorTitle>
            {candidateComps}
          </LegislatorDistrict>
        )
      })}
    </InfoboxScrollWrapper>
  )
}

const CouncilmanDistrict = styled.div`
  padding: 20px 0;
  border-top: 1px solid #000;
  &:first-of-type {
    border-top: unset;
    padding-top: unset;
  }
  &:last-of-type {
    padding-bottom: unset;
  }
`
const CouncilmanConstituency = styled.div`
  font-size: 17px;
  color: gray;
`

const CouncilmanTitle = styled.div`
  margin-bottom: 20px;
  font-weight: 700;
`

const CouncilmanCandidate = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  line-height: 26px;
  ${({ elected }) => elected && 'color: green;'}
`

const CouncilmanInfobox = ({ level, profRate, districts }) => {
  if (level === -1) {
    return (
      <InfoboxScrollWrapper>
        <InfoboxText>點擊地圖看更多資料</InfoboxText>
      </InfoboxScrollWrapper>
    )
  }
  return (
    <InfoboxScrollWrapper>
      {districts.map(({ county, area, range, candidates }) => {
        const councilmandPrefix = county + area
        const constituency = range.split(' ')[1]
        const candidateComps = candidates.map((candidate) => {
          const elected = candidate.candVictor === '*'
          return (
            <CouncilmanCandidate
              elected={elected}
              key={councilmandPrefix + candidate.canNo}
            >
              {candidate.name} {candidate.party} {candidate.tksRate}%
              {elected && <ElectedIcon src={ElectedSVG} alt="elected" />}
            </CouncilmanCandidate>
          )
        })
        return (
          <CouncilmanDistrict key={councilmandPrefix}>
            <CouncilmanConstituency>{constituency}</CouncilmanConstituency>
            <CouncilmanTitle>投票率 {profRate}%</CouncilmanTitle>
            {candidateComps}
          </CouncilmanDistrict>
        )
      })}
    </InfoboxScrollWrapper>
  )
}

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} InfoboxTemplateInput
 * @property {string} type - Election types, like president
 * @property {number} level - Info level: 1. country, 2. county, 3. towns / constituency 4. village
 * @property {number} profRate - Total vote rate
 * @property {object[]} candidates - All candidates info
 */

/**
 * Create infobox template based on the election infos
 * @param {InfoboxTemplateInput} input
 * @return {string} template
 */

// const templates = {
//   president: `
//   投票率 ${profRate}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   `,
//   mayor: `
//   總投票率 ${profRate}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   `,
//   councilman: `
//   ${constituency}
//   投票率 ${profRate}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   `,
//   legislator: `
//   ${constituency}
//   投票率 ${profRate}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   ${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
//   `,
// }

export const Infobox = ({ type }) => {
  let infobox
  switch (type) {
    case 'president': {
      const { summary } = presidentMockData
      const { profRate, candidates } = summary

      infobox = (
        <PresidentInfobox
          level={1}
          profRate={profRate}
          candidates={candidates}
        />
      )
      break
    }
    case 'mayor': {
      const mayorCity = mayorMockData.districts[0]
      const { profRate, candidates } = mayorCity
      infobox = (
        <MayorInfobox level={2} profRate={profRate} candidates={candidates} />
      )
      break
    }
    case 'legislator': {
      const { summary, districts } = legislatorMockData
      const { profRate } = summary
      infobox = (
        <LegislatorInfobox
          level={1}
          profRate={profRate}
          districts={districts}
        />
      )
      break
    }
    case 'councilman': {
      const { summary, districts } = councilmanMockData
      const { profRate } = summary
      infobox = (
        <CouncilmanInfobox
          level={1}
          profRate={profRate}
          districts={districts}
        />
      )
      break
    }
    case 'referenda':
    default:
      break
  }

  return <InfoboxWrapper>{infobox}</InfoboxWrapper>
}

/*
總統
投票率 ${profRate}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}

縣市首長
總投票率 ${profRate}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}

立法委員
下面可能是array
${選區名稱}
投票率 ${profRate}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
or
點擊地圖看更多資訊

縣市議員
下面可能是array
${選區名稱}
投票率 ${profRate}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
${candidate.name} ${candidate.party} ${candidate.tksRate} ${candidate.candVictor}
or
點擊地圖看更多資訊

公投
${公投案號} ${公投案簡稱}
此案是否通過：${通過與否}
投票率 ${profRate}
同意 ${agreeRate}
不同意 ${全國投票率得票率}


*/

/**
 * President level: 1. country, 2. county, 3. towns 4. village
 * Mayor level: 1. county, 2. towns 3. village
 * Councilmen level: 1. county, 2. constituency 3. village
 * Indigenous Councilmen level: 1. county, 2. constituency 3. village
 * Legislators level: 1. county 2. constituency 3. village
 * Indigenous Legislators level: 1. country, 2. county, 3. towns 4. village
 * Legislators Party level: 1. country, 2. county, 3. towns 4. village
 * Referenda level: 1. country, 2. county, 3. towns 4. village
 */
