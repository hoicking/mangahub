import React, { useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {Add} from '@mui/icons-material'

import Contact from '../features/contact'

// import { useLocalStorage } from '../hooks/useStorage'

import Errorbound from '../hoc/errorBound'
import { useManga } from '../hooks/dataHook'

import { useAppStore } from '../store'
import { isMobileDevice } from '../util/util'
import { EditorRef, MangaEditor } from '../features/mangaEditor'

import scss from  './style/home.module.scss'

const Index: React.FC = () => {
    const editorRef = useRef<EditorRef>(null)
    const [mangas, getManga] =  useManga()
    const {isManager} = useAppStore(state => state)

    const [count, setCount] = useState(0)

    const isPc = !isMobileDevice()

    const navigate = useNavigate()

    const clickTitle = () => {
        setCount(count + 1)
        console.log(count)
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
            <div className={scss.title} onClick={clickTitle}> Manga Hub</div>

            <div className={scss.mangas}>
                {
                    mangas.map((item) => (
                        <div key={item.id} className={scss.cover} onClick={() => goChapters(item.enname)}>
                            <img 
                                className={scss['cover__img']}
                                src={item.cover}
                                alt={item.name}
                            />
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
            <MangaEditor ref={editorRef} onSaved={ getManga }/>
        </div>
    )
}

const ErrorBoundIndex = Errorbound(Index);

export default ErrorBoundIndex