import Alert from 'react-s-alert'
import { withProps } from 'recompose'

export default function (name) {
  return withProps({
    [name]: Alert
  })
}