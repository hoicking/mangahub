import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

import { getMangas } from '../services'

import { useLocalStorage } from '../hooks/useStorage'

import scss from  './style/home.module.scss'
import * as model from '../services/model'


const Index: React.FC = () => {

    const [mangas, setMangas] =  useState<model.Manga[]>([])
    const [, setCache] = useLocalStorage('cacheDate', Date.now().toString())

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

    return (
        <div className={scss.main}>
            <div className={scss.title}> Manga Hub</div>

            <div className={scss.mangas}>
                {
                    mangas.map((item) => (
                        <div key={item.id} className={scss.cover} onClick={() => goChapters(item.id)}>
                            <img className={scss['cover__img']} src={item.cover} />
                            <div className={scss['cover__title']}>{item.name}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export default Index