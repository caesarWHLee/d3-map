import { useEffect, useState } from 'react'
import { json } from 'd3'
import { feature, merge } from 'topojson'

const twCountiesJson =
  'https://cdn.jsdelivr.net/npm/taiwan-atlas/counties-10t.json'
const twTownsJson = 'https://cdn.jsdelivr.net/npm/taiwan-atlas/towns-10t.json'
const villagesJson =
  'https://cdn.jsdelivr.net/npm/taiwan-atlas/villages-10t.json'

export const useMapData = () => {
  const [mapData, setMapData] = useState(null)

  useEffect(() => {
    const fetchMapJsons = async () => {
      const responses = await Promise.allSettled([
        json(twCountiesJson),
        json(twTownsJson),
        json(villagesJson),
      ])
      const mapJsons = responses.map((response) => response.value)

      const [countiesTopoJson, townsTopoJson, villagesTopoJson] = mapJsons
      const { counties } = countiesTopoJson.objects
      const { towns } = townsTopoJson.objects
      const { villages } = villagesTopoJson.objects

      console.log(feature(townsTopoJson, towns))
      console.log(feature(villagesTopoJson, villages))
      console.log(merge(villagesTopoJson, villages.geometries))
      setMapData({
        counties: feature(countiesTopoJson, counties),
        towns: feature(townsTopoJson, towns),
        villages: feature(villagesTopoJson, villages),
        // villages: merge(villagesTopoJson, villages.geometries),
      })
    }
    if (!mapData) {
      fetchMapJsons()
    }
  }, [])

  return mapData
}
