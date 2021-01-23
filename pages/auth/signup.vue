<template>
  <div>
    <v-toolbar color="primary">
      <div class="text-center secondary--text text-headline font-weight-bold">
        <v-icon left color="secondary">mdi-shield-account-outline</v-icon>Signup
        to access Courses
      </div>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form ref="newUserForm" v-model="valid" @submit.prevent="addNewUser">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="signupData.firstName"
              label="First Name"
              hint="Enter Your Name"
              :rules="rules.firstName"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="signupData.lastName"
              label="Last Name"
              hint="Enter Your Family Name"
              :rules="rules.lastName"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
          v-model="signupData.username"
          label="Username"
          hint="Enter a unique name as username"
          :rules="rules.username"
        >
        </v-text-field>
        <v-text-field
          v-model="signupData.email"
          label="Email"
          hint="Enter your valid email address"
          :rules="rules.email"
          type="email"
        >
        </v-text-field>
        <v-text-field
          v-model="signupData.password"
          label="Password"
          hint="Enter your account password"
          :rules="rules.password"
          type="password"
        >
        </v-text-field>
        <div class="text-center mt-4 mb-3">
          <v-btn outlined small color="primary" :loading="loading" type="submit"
            >Sign Up</v-btn
          >
        </div>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <div class="text-center mt-1 pb-2">
      <v-btn text small color="primary" class="text-capitalize" @click="signin"
        >Already Have Account? Log In</v-btn
      >
    </div>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'
import { formRules } from '~/assets/javascript/formRules'
export default {
  name: 'Signup',
  layout: 'auth',
  middleware: 'auth-login-signup',
  data() {
    return {
      rules: formRules,
      loading: false,
      valid: false,
      signupData: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    signin() {
      this.$router.push({ name: 'auth-login' })
    },
    async addNewUser() {
      if (!this.$refs.newUserForm.validate()) {
        this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          CONSTANTS.MESSAGES.FORM_ERROR
        )
        return
      }
      this.loading = true
      try {
        const { data } = await this.$axios.post('auth/signup', {
          data: this.signupData,
        })
        // eslint-disable-next-line no-console
        console.log(data)
        this.$store.dispatch('snackalert/showSuccessSnackbar', data.message)
        this.$router.push({ name: 'auth-login' })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        let msg
        if (e.response) {
          msg = e.response.data.message
        } else if (!msg) {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
        }
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
      }
      this.loading = false
    },
  },
  head: {
    title: `Signup`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: `${CONSTANTS.APP_NAME} signup page, Online maths schools`,
      },
    ],
  },
}
</script>

<style scoped></style>
