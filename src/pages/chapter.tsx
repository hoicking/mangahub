import {useEffect, useState} from 'react'

import { useParams, useNavigate } from "react-router-dom"

import { Chapter } from '../services/model'

import {getChapters} from '../services/index'

import scss  from './style/chapter.module.scss'
function Index () {

    const {id} =  useParams()

    const navigate = useNavigate()

    const [chapters, setChapters] = useState<Chapter[]>([])

    useEffect(() => {
        getDatas()
    }, [])

    const getDatas = async() => {
        try {
            const res = await getChapters(id)
            setChapters(res)
        } catch (error) {
            console.log(error)
        }

    }

    const goManga = (chapter: Chapter) => {
        navigate(`${chapter.id}?title=${chapter.title}&num=${chapter.pageNum}`)
    }

    return (
        <div className={scss.main}>
            {
                chapters.map((item) => (
                    <div className={scss.cover} key={item.id} onClick={() => goManga(item)}>
                        <img className={scss['cover__img']} src={item.cover} />
                        <div className={scss['cover__title']}>{item.title}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default Index