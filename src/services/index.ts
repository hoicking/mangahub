// import axios from "axios"

import * as request from '../util/request';
import * as model from "./model";


export const getMangas = (): Promise<model.Manga[]  | []> => {
  return request.get('mangas')
}

export const getChapters = (id: string): Promise<model.Chapter[] | []> => {
  return request.get(`chapter?id=${id}`)
}

export const createManga = (body: model.IManga) => {
  return request.put('manga', body)
}

// 上传封面 
export const uploadCover = (file: FormData) => {
  return request.post('upload/cover', file)

}

