// import axios from "axios"

import * as model from "./model";


export const getMangas = (): Promise<model.Manga[]  | []> => {
  // return axios.get('getMangas')

  return new Promise((resolve) => {

    setTimeout(() => {
      resolve([
        {
          name: '咒术回战',
          id: 'jujutsuKaisen',
          des: '《咒术回战》（日语：呪術廻戦）是日本漫画家芥见下下的漫画作品，集英社出版，于漫画杂志《周刊少年Jump》2018年第14号开始连载。',
          cover: '/images/Jujutsu Kaisen/cover/cover.jpg'
        },
        {
          name: '电锯人',
          id: 'chainsawMan',
          des:  '《电锯人》（日语：チェンソーマン）是由日本漫画家藤本树所创作的黑暗奇幻少年漫画，该作于2018年12月3日发售的《周刊少年Jump》2019年第1号开始连载，这也是藤本首度在该杂志连载的作品[注 1][1]。',
          cover: '/images/chainsaw man/cover/cover.jpg'
        }
      ])
    }, 500);
  })
}

export const getChapters = (id: string | undefined): Promise<model.Chapter[] | []> => {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: 241,
          title: '第一章',
          cover: '/images/Jujutsu Kaisen/chapters/241/1.jpeg',
          pageNum: 19
        },
        {
          id: 240,
          title: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
          cover: '/images/Jujutsu Kaisen/chapters/240/1.jpeg',
          pageNum: 21
        },
        {
          id: 239,
          title: '测试测试测试测试测试测试测试测试测试',
          cover: '/images/Jujutsu Kaisen/chapters/239/1.jpeg',
          pageNum: 19
        }
      ])
    }, 500);

  })

}

