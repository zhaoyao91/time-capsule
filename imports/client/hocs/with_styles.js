import { withProps } from 'recompose'
import { css } from 'glamor'
import { mapValues }from 'lodash/fp'

export default function withStyles (name, styles) {
  return withProps({
    [name]: mapValues(css, styles)
  })
}