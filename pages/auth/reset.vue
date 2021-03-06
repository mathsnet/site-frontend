<template>
  <v-card-text>
    <!-- TODO: use fetch to validate key and show spinner here
     TODO: for user to known what is going on while validating the key -->
    <div v-if="canChangePassword">
      <div class="text-center font-weight-bold primary--text text-title mb-6">
        Reset Password
      </div>
      <v-form ref="resetPasswordForm" :value="valid">
        <v-text-field
          v-model="password"
          :type="fieldType"
          :append-icon="showPassIcon"
          label="New Password"
          :rules="rule"
          @click:append="showPass = !showPass"
        />
        <div class="text-center mt-5 mb-7">
          <v-btn
            outlined
            color="primary"
            :loading="loading"
            small
            @click="updateUserPassword"
            >Continue</v-btn
          >
        </div>
      </v-form>
    </div>
    <div v-else class="text-center font-weight-bold text-title error--text">
      Sorry! You can't update unknown account password. Please generate the
      recovery link for your account
      <v-btn
        text
        plain
        color="primary"
        :to="{ name: 'auth-recovery' }"
        class="text-capitalize"
        >Here</v-btn
      >
    </div>
    <div class="text-center">
      <v-btn
        class="text-capitalize"
        text
        plain
        color="primary"
        :to="{ name: 'auth-recovery' }"
        >Generate Key Here</v-btn
      >
    </div>
  </v-card-text>
</template>

<script>
import { formRules } from '~/assets/javascript/formRules'
import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  name: 'Reset',
  layout: 'auth',
  middleware: 'auth-login-signup',
  data() {
    return {
      rule: formRules.password,
      canChangePassword: true,
      valid: false,
      password: '',
      showPass: false,
      loading: false,
      keyFromLink: this.$route.query.key,
      updateStatus: false,
    }
  },
  computed: {
    showPassIcon() {
      return this.showPass ? 'mdi-eye' : 'mdi-eye-off'
    },
    fieldType() {
      return this.showPass ? 'text' : 'password'
    },
  },
  methods: {
    async updateUserPassword() {
      if (!this.$refs.resetPasswordForm.validate()) {
        this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          CONSTANTS.MESSAGES.FORM_ERROR
        )
        return
      }
      this.loading = true
      try {
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.AUTH.UPDATE_PASSWORD,
          {
            key: this.keyFromLink,
            password: this.password,
          }
        )

        this.updateStatus = data.status
        if (this.updateStatus === true) {
          this.$store.dispatch('snackalert/showSuccessSnackbar', data.message)
          this.$router.push({ name: 'auth-login' })
        } else {
          this.$store.dispatch('snackalert/showErrorSnackbar', data.message)
        }
      } catch (e) {
        let msg
        if (e.response) {
          msg = e.response.data.message
        } else {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
        }
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
      }
      this.loading = false
    },
  },
  head: {
    title: 'Reset Password',
  },
}
</script>

<style scoped></style>
