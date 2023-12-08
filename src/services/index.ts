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

export const createChapter = (body: model.IChapter) => {
  return request.put('chapter', body)
}

// 上传封面 
export const uploadCover = (file: FormData) => {
  return request.post('upload/cover', file)

}

// 上传章节图片
export const uploadChapter = (enName: string, no: string,files: FileList) => {
  const formData = new FormData()
  Array.from(files).forEach((file, index) => {
    formData.append(`file${index}`, file)
  })
  return request.post(`upload/chapter/${enName}/${no}`, formData)
}

