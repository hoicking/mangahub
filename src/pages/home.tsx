import React, { useRef, useState, useEffect } from 'react'
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

    const observerRef = useRef<IntersectionObserver | null>(null)
    const imageRefs = useRef<(HTMLImageElement | null)[]>([])
    const mangasRef = useRef(null)


    useEffect(() => {
        const observerOptions  = {
            root: mangasRef.current,// 观察器的根元素，默认为视口
            rootMargin: '0px', // 根元素边距
            threshold: 0.1 // 目标元素与根元素交叉的比例
        }
        const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
                console.log(entry)
                if (entry.isIntersecting) {
                    const image = entry.target as HTMLImageElement
                    image.src = image.dataset?.src || ''
                    observer.unobserve(image)
                  }

            })

        }, observerOptions)

        observerRef.current = observer

        return () => {
            observer.disconnect()
        }

    }, [])

    useEffect(() => {
        if (observerRef.current) {
            mangas.forEach(( _, index) => {
                observerRef.current?.observe(imageRefs.current[index] as HTMLImageElement)
            })
        }
      }, [mangas])

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

            <div className={scss.mangas} ref={mangasRef}>
                {
                    mangas.map((item, index) => (
                        <div key={item.id} className={scss.cover} onClick={() => goChapters(item.enname)}>
                            <img 
                                className={scss['cover__img']}
                                ref={(ref) => (imageRefs.current[index] = ref)}
                                key={item.id}
                                data-src={item.cover}
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