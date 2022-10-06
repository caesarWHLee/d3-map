import { useEffect, useState } from "react"
import {json} from 'd3'
import {feature} from 'topojson'

// const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'
const jsonUrl = 'https://cdn.jsdelivr.net/npm/taiwan-atlas/counties-10t.json'
// const jsonUrl = 'https://www.readr.tw/proj-assets/vote2018-result/tw.json'
// const jsonUrl = 'https://cdn.jsdelivr.net/npm/taiwan-atlas/counties-mercator-10t.json'

export const useData = () => {
  const [data, setData] = useState(null)
 
  console.log(data)
  useEffect(() => {
    if (!data) {
      console.log('get topojson')
      json(jsonUrl).then(topojsonData => {
        const {counties} = topojsonData.objects
        setData(feature(topojsonData, counties))
      })  
    }
  }, [data])

  return data
}