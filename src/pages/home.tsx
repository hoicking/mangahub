import React, { useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {Add} from '@mui/icons-material'

import Contact from '../features/contact'
import { getMangas } from '../services'

import { useLocalStorage } from '../hooks/useStorage'

import scss from  './style/home.module.scss'
import * as model from '../services/model'
import { useAppStore } from '../store'
import { isMobileDevice } from '../util/util'
import { MangaEditor } from '../features/mangaEditor'


const Index: React.FC = () => {
    const editorRef = useRef(null)

    const [mangas, setMangas] =  useState<model.Manga[]>([])
    const [, setCache] = useLocalStorage('cacheDate', Date.now().toString())
    const {isManager} = useAppStore(state => state)

    const isPc = !isMobileDevice()

    const navigate = useNavigate()
    useEffect(()  => {
        initData()

    }, [])

    const initData = async () => {
        const mangas: model.Manga[] = await getMangas()
        setMangas(mangas)
    }

    const goChapters = (id: string) => {
        navigate(`/manga/${id}`)
    }

    const addManga = () => {
        editorRef?.current?.open()
    }

    return (
        <div className={scss.main}>
            <Contact />
            <div className={scss.title}> Manga Hub</div>

            <div className={scss.mangas}>
                {
                    mangas.map((item) => (
                        <div key={item.id} className={scss.cover} onClick={() => goChapters(item.enname)}>
                            <img className={scss['cover__img']} src={item.cover} />
                            <div className={scss['cover__title']}>{item.name}</div>
                        </div>
                    ))
                }

                {
                    isManager && isPc && <div  className={scss['add']} onClick={() => addManga()}>
                        <Add className={scss['add__icon']} fontSize='large'/>
                    </div>
                }
            </div>
            <MangaEditor ref={editorRef} onSaved={() => initData()}/>
        </div>
    )
}


export default Index