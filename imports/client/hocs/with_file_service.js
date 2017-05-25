import { withProps } from 'recompose'

import FileService from '../services/file'

export default function (name) {
  return withProps({
    [name]: FileService
  })
}