import { withProps } from 'recompose'

export default function (name) {
  return withProps({
    [name]: new Date()
  })
}