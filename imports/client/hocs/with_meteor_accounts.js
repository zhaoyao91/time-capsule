import { Accounts } from 'meteor/accounts-base'
import { withProps } from 'recompose'

export default function (name) {
  return withProps({
    [name]: Accounts
  })
}