import { useState, useEffect, useCallback } from "react"

import * as model from '../services/model'
import { getMangas } from '../services'

export const useManga = (): [model.Manga[], () => void] => {

  const [manga, setManga] = useState<model.Manga[]>([])

  const getManga = useCallback(async () => {
    try {
      const mangas: model.Manga[] = await getMangas()
      setManga(mangas)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getManga()
  }, [getManga])
  
  return [
    manga,
    getManga
  ]
}