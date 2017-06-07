import { withProps } from 'recompose'

import { confirm } from '../ui/views/ConfirmModals'

export default function (name) {
  return withProps({
    [name]: confirm
  })
}