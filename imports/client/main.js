import createBrowserHistory from 'history/createBrowserHistory'

import './styles/imports'

import promisifyAPIs from './boot/promisify_apis'
import mountApp from './boot/mount_app'
import setMomentLocale from './boot/set_moment_locale'
import setupAccounts from './boot/setup_accounts'

const history = createBrowserHistory()

promisifyAPIs()
mountApp(history)
setMomentLocale()
setupAccounts(history)