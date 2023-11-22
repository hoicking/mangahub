import { useParams, useLocation } from "react-router-dom"

import scss from './style/manga.module.scss'

function Index () {

  const {chapter} =  useParams()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  
  // 读取特定查询参数的值
  const pageNum: number = parseInt(queryParams.get('num') || '')

  const title = queryParams.get('title')

  console.log(chapter)

  return (

    <div className={scss.main}>
      {
        Array.from({length: pageNum}, (_, index) => (
          <img src={`/images/Jujutsu Kaisen/chapters/${chapter}/${index + 1}.jpeg`}/>
        ))
      }
    </div>
  )
}


export default Index