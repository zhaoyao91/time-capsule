import { withProps } from 'recompose'

import { prompt } from '../ui/views/PromptModals'

export default function (name) {
  return withProps({
    [name]: prompt
  })
}