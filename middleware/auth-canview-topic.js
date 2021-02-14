import { CONSTANTS } from '~/assets/javascript/constants'

export default function ({ store, $auth, $axios, redirect }) {
  if (
    !(
      $auth.user.user_type !== CONSTANTS.USER_TYPES.ADMIN ||
      $auth.user.user_type !== CONSTANTS.USER_TYPES.INSTRUCTOR
    )
  ) {
    const msg = CONSTANTS.MESSAGES.NO_ACCESS_TO_TOPIC
    store.dispatch('snackalert/updateSnackbar', {
      color: 'error',
      msg,
      show: true,
    })
    redirect({ name: 'index' })
  }
}
