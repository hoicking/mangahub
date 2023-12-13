import React from 'react'


const handleError = (WrappedComponent: React.FC | React.ComponentClass) => {


  return class extends React.Component{
    state = {
      hasError: false
    }
    constructor (props: object) {
      super(props)
    }

    static getDerivedStateFromError(error: Error) {
      console.log(error)
      return {hasError: true}
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
      console.log(error, errorInfo)
    }

    render () {
      if (this.state.hasError) {
        return <div>something wrong</div>

      } else {

        return <WrappedComponent/>
      }

    }

  }

}

export default handleError