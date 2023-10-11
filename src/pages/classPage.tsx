import React from 'react'

import timeHoc from '../util/hoc'
class ForTest extends React.Component {
    constructor (props: any) {
        super(props)
    }

    render () {
        return <div> hello world</div>
    }
}

export default timeHoc(ForTest)