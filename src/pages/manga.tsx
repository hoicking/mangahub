import { useLocation } from "react-router-dom"

import scss from './style/manga.module.scss'

function Index () {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  
  // 读取特定查询参数的值
  const pageNum = parseInt(queryParams.get('num') || '')
  document.title = queryParams.get('title') || ''

  const baseUrl = decodeURIComponent(queryParams.get('baseurl') || '')

  return (

    <div className={scss.main}>
      {
        Array.from({length: pageNum}, (_, index) => (
          <img key={index} src={`${baseUrl}/${index + 1}.jpeg`}/>
        ))
      }
    </div>
  )
}


export default Index