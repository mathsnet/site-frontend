import { CONSTANTS } from '~/assets/javascript/constants'

export default function ({ store, $auth, $axios, redirect }) {
  if (!$auth.loggedIn) {
    const msg = CONSTANTS.MESSAGES.LOGIN_REQUIRED
    store.dispatch('snackalert/updateSnackbar', {
      color: 'error',
      msg,
      show: true,
    })
    redirect({ name: 'auth-login' })
  }
}
