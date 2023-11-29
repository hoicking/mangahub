export type Manga = {
  id?: string,
  name: string,
  enname: string,
  describe: string,
  cover: string,
  author: string,
  updatetime?: string
}

export type Chapter = {
  id: string,
  name: string,
  no: string,
  mangaid: string,
  mangaenname: string,
  postdate: string,
  cover: string,
  totalpage: number
}

export interface IManga {
  name: string,
  enname: string,
  author: string,
  describe: string,
  cover: string,
  [key: string]: string | number | boolean | undefined| null
}