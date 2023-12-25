import {useEffect, useRef, useState} from 'react'

import { useParams, useNavigate } from "react-router-dom"
import {Add} from '@mui/icons-material'

import Empty from '../features/empty'

import { Chapter } from '../services/model'

import {getChapters} from '../services/index'
import { useAppStore } from '../store'
import { isMobileDevice } from '../util/util'
import { ChapterEditor , EditorRef} from '../features/chapterEditor'


import scss  from './style/chapter.module.scss'
function Index () {
    const editorRef = useRef<EditorRef>(null)

    const {isManager} = useAppStore(state => state)
    const {id} = useParams()
    const navigate = useNavigate()
    const [chapters, setChapters] = useState<Chapter[]>([])

    const isPc = !isMobileDevice()


    useEffect(() => {
        getDatas()
    }, [])

    const getDatas = async() => {
        try {
            const res = await getChapters(id || '')
            setChapters(res)
        } catch (error) {
            console.log(error)
        }

    }

    const goManga = (chapter: Chapter) => {
        const strBeforeFilename = chapter.cover.substring(0, chapter.cover.lastIndexOf('/'));
        // console.log(strBeforeFilename);  // https://holicking.oss-cn-hangzhou.aliyuncs.com/jujutsukaisen/chapters/241
        navigate(`${chapter.no}?title=${chapter.name}&num=${chapter.totalpage}&baseurl=${encodeURIComponent(strBeforeFilename)}`)
    }

    const addChapter = () => {
        editorRef?.current?.open()
    }

    return (
        <div className={scss.main}>
            { chapters.length  === 0 && <Empty /> }
            {
                chapters.length > 0 && chapters.map((item) => (
                    <div className={scss.cover} key={item.id} onClick={() => goManga(item)}>
                        <img className={scss['cover__img']} src={item.cover} alt={item.name}/>
                        <div className={scss['cover__title']}>{item.no} {item.name}</div>
                    </div>
                ))
            }
            {
                isManager && isPc && <div  className={scss['add']} onClick={() => addChapter()}>
                    <Add className={scss['add__icon']} fontSize='large'/>
                </div>
            }

            <ChapterEditor ref={editorRef} enName={id} successCallback={() => getDatas()}/>
        </div>
    )
}

export default Index