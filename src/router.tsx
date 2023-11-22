import React, {Suspense} from 'react'

import {createBrowserRouter} from 'react-router-dom'

const Home = React.lazy(() => import('./pages/home'))
const Chapter = React.lazy(() => import('./pages/chapter'))
const Manga = React.lazy(() => import('./pages/manga'))
const Router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback={ <div>loading................</div>}>
                <Home />
            </Suspense>
        )
    },
    {
        path: '/manga/:id',
        element: (
            <Suspense fallback={ <div>loading................</div>}>
                <Chapter/>
            </Suspense>
        ),
    },{
        path: '/manga/:id/:chapter',
        element: (
        <Suspense fallback={ <div>loading................</div>}>
            <Manga/>
        </Suspense>
        )
    }
])

export default Router