export interface Manga {
  id: string,
  name: string,
  enname: string,
  describe: string,
  cover: string,
  author: string,
  updatetime: string
}

export interface Chapter {
  id: string,
  name: string,
  no: string,
  mangaenname: string,
  postdate: string,
  cover: string,
  totalpage: number
}

export type IChapter = Omit<Chapter, 'id' | 'postdate' >


export type IManga = Omit<Manga, 'id'|'updatetime' >
