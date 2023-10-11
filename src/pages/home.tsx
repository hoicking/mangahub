import {useState, useEffect} from 'react'


import Fortest from './classPage'


function Index () {

    const [count, setCount] = useState(0)

    // const a =  new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(100)
    //     }, 1000);
    // })


    return (
        <> 
            this is home
            <Fortest />
        </>
    )
}


export default Index