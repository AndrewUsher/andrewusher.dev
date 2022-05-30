declare module 'react-typical' {
  import * as React from 'react'

  type ReactTypicalProps = {
    loop: number
    steps: Array<string | number>
    wrapper: string
  }

  function ReactTypical(props: ReactTypicalProps): React.ReactElement
  export default ReactTypical
}
