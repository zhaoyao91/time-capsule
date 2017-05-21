import { withProps, compose } from 'recompose'
import qs from 'qs'

// must be placed after withRouter HOC
export default function (name) {
  return withProps(({location = window.location}) => ({
    [name]: qs.parse(location.search.substr(1))
  }))
}