import { withProps } from 'recompose'

// must be placed after withRouter HOC
export default function (name) {
  return withProps(({match}) => ({
    [name]: match.params
  }))
}