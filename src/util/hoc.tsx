import React from 'react'


// 计算组件渲染时间 example


interface Props {
    [key: string]: string | number
}

function timeHoc (wrappedComponent: React.ComponentClass) : React.ComponentClass {
    let [start, end] = [0, 0]

    return class extends wrappedComponent {

        constructor (props: Props) {
            super(props)
            start = 0
            end = 0
        }


        componentWillMount(): void {
            if (super.componentWillMount) {
                super.componentWillMount.call(this)
            }

            start = new Date().getTime()
        }

        componentDidMount(): void {
            if (super.componentDidMount) {
                super.componentDidMount.call(this)
            }

            end = new Date().getTime()
            console.log('耗时/s', (end - start) / 1000)
        }   

        render() {
            return super.render()
        }
    }
}

export default timeHoc
