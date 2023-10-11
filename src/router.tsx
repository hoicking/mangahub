import React, {Suspense} from 'react'

import {createBrowserRouter} from 'react-router-dom'

const Home = React.lazy(() => import('./pages/home'))
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
        path: '/manga',
        element: <Manga/>
    }
])

export default Router