import {useEffect} from 'react'
function Index () {

    useEffect(() => {
        setTimeout(() => {
            console.log('manga has been loaded')
        }, 1000);

    }, [])
    return (
        <>this is manga</>
    )
}

export default Index