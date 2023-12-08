
import { memo } from 'react'
import scss from './index.module.scss'

const Index = memo(() => {

    const playing = true

    return (
        <div className={scss.main}>
            <img className={`${scss.logo} ${playing? scss.playing: ''}`} src="/pokita.png" alt='avatar' title='Pochita' />
            <div className={scss.wechat}> 
                <span>Wechat:</span>
                <br />
                <span className={scss['wechat-detail']}>NIGGERSTAR</span>
            </div>
        </div>
    )
})


export default Index