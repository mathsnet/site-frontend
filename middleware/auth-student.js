import { CONSTANTS } from '~/assets/javascript/constants'

export default function ({ store, $auth, $axios, redirect }) {
  if ($auth.user.user_type !== CONSTANTS.USER_TYPES.STUDENT) {
    const msg = CONSTANTS.MESSAGES.STUDENT_REQUIRED
    store.dispatch('snackalert/updateSnackbar', {
      color: 'error',
      msg,
      show: true,
    })
    if ($auth.user.user_type === CONSTANTS.USER_TYPES.INSTRUCTOR) {
      redirect({ name: 'instructor-topics' })
    } else if ($auth.user.user_type === CONSTANTS.USER_TYPES.ADMIN) {
      redirect({ name: 'admin-dashboard' })
    } else {
      redirect({ name: 'index' })
    }
  }
}
