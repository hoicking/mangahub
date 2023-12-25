import { useEffect, useCallback } from "react"

export const useImage = (images: string[]) => {

  const loadImages =  useCallback( (imgs: string[]) => {
    imgs.forEach(item => {
      const image = new Image()
      image.src = item
    })
  }, [])

  useEffect(() => {
    loadImages(images)
  }, [loadImages, images])
}