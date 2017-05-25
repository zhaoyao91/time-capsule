import './styles/imports'

import promisifyAPIs from './boot/promisify_apis'
import mountApp from './boot/mount_app'
import setMomentLocale from './boot/set_moment_locale'

promisifyAPIs()
mountApp()
setMomentLocale()