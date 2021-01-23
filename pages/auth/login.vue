<template>
  <div>
    <v-toolbar color="primary">
      <div class="text-center secondary--text text-headline font-weight-bold">
        <v-icon left color="secondary">mdi-shield-account-outline</v-icon>Login
        into your account
      </div>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form ref="signin" v-model="valid" @submit.prevent="loginUser">
        <v-text-field
          v-model="loginData.usernameEmail"
          :rules="rules.usernameEmail"
          label="Username/Email"
          hint="Enter your username or email to sign in"
          prepend-inner-icon="mdi-account-circle-outline"
        ></v-text-field>
        <v-text-field
          v-model="loginData.password"
          label="Password"
          :rules="rules.passwordLogin"
          prepend-inner-icon="mdi-lock-outline"
          hint="Enter your account password"
          type="password"
        >
        </v-text-field>
        <div class="text-center mt-4">
          <v-btn outlined small color="primary" :loading="loading" type="submit"
            >Sign In</v-btn
          >
          <div class="mt-3">
            <v-btn text x-small color="primary" @click="forgotPass"
              >Forgot your password?</v-btn
            >
          </div>
        </div>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <div class="text-center mt-1 pb-2">
      <v-btn text small color="primary" class="text-capitalize" @click="signup"
        >New Here? Signup</v-btn
      >
    </div>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'
import { formRules } from '~/assets/javascript/formRules'

export default {
  name: 'Login',
  layout: 'auth',
  middleware: 'auth-login-signup',
  data() {
    return {
      loginData: {
        usernameEmail: '',
        password: '',
      },
      valid: false,
      loading: false,
      rules: formRules,
    }
  },
  methods: {
    async loginUser() {
      if (!this.$refs.signin.validate()) {
        this.$store.dispatch('snackalert/updateSnackbar', {
          show: true,
          msg: CONSTANTS.MESSAGES.FORM_ERROR,
          color: 'error',
        })
        return
      }
      this.loading = true
      try {
        const res = await this.$auth.loginWith('local', {
          data: this.loginData,
        })
        // eslint-disable-next-line no-console
        console.log(res)
        this.$store.dispatch('snackalert/updateSnackbar', {
          color: 'success',
          msg: res.data.message,
          show: true,
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        let msg
        if (e.response) {
          msg = e.response.data.message
        } else {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
          // eslint-disable-next-line no-console
          console.log(msg)
        }
        this.$store.dispatch('snackalert/updateSnackbar', {
          color: 'error',
          msg,
          show: true,
        })
      }
      this.loading = false
    },
    signup() {
      this.$router.push({ name: 'auth-signup' })
    },
    forgotPass() {
      this.$router.push({ name: 'auth-recovery' })
    },
  },
  head: {
    title: `Login`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: `${CONSTANTS.APP_NAME} login page, Online maths schools`,
      },
    ],
  },
}
</script>

<style scoped></style>
