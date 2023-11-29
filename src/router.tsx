import React, {Suspense} from 'react'

import {createBrowserRouter} from 'react-router-dom'

import Loading from './features/loading'

const Home = React.lazy(() => import('./pages/home'))
const Chapter = React.lazy(() => import('./pages/chapter'))
const Manga = React.lazy(() => import('./pages/manga'))
const Router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback={ <Loading />}>
                <Home />
            </Suspense>
        )
    },
    {
        path: '/manga/:id',
        element: (
            <Suspense fallback={ <Loading/>}>
                <Chapter/>
            </Suspense>
        ),
    },{
        path: '/manga/:id/:chapter',
        element: (
        <Suspense fallback={ <Loading />}>
            <Manga/>
        </Suspense>
        )
    }
])

export default Router