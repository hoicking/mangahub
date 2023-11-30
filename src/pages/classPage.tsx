import React from 'react'

import timeHoc from '../util/hoc'

interface Props {
    name: string

}
class ForTest extends React.Component {
    constructor (props: Props) {
        super(props)
    }

    render () {
        return <div> hello world</div>
    }
}

export default timeHoc(ForTest)