<template>
  <v-card-text>
    <div v-if="!emailSent">
      <div class="text-center font-weight-bold primary--text text-title mb-6">
        Recover Account
      </div>
      <v-form ref="recoveryForm" :value="valid">
        <v-text-field
          v-model="recoveryData.username"
          placeholder="Enter the Username associated with your account"
          label="Username"
          :rules="rules.username"
        />
        <v-text-field
          v-model="recoveryData.email"
          placeholder="Enter the Email associated with your account"
          label="Email"
          type="email"
          :rules="rules.email"
        />
        <div class="text-center mt-5 mb-7">
          <v-btn
            outlined
            color="primary"
            :loading="loading"
            small
            @click="generateAndSendRecoveryLink"
            >Continue</v-btn
          >
        </div>
      </v-form>
    </div>
    <div v-else class="text-center font-weight-bold text-title success--text">
      Open Your mailbox/spam box and follow the procedure to recover your
      account
    </div>
  </v-card-text>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'
import { formRules } from '~/assets/javascript/formRules'
export default {
  name: 'Recovery',
  layout: 'auth',
  middleware: 'auth-login-signup',
  components: {},
  data() {
    return {
      rules: formRules,
      valid: false,
      emailSent: false,
      loading: false,
      recoveryData: {
        username: '',
        email: '',
      },
    }
  },
  computed: {},
  methods: {
    async generateAndSendRecoveryLink() {
      if (!this.$refs.recoveryForm.validate()) {
        this.$store.dispatch('snackalert/updateSnackbar', {
          show: true,
          msg: CONSTANTS.MESSAGES.FORM_ERROR,
          color: 'error',
        })
        return
      }
      this.loading = true
      try {
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.AUTH.GENERATE_RECOVERY_TOKEN,
          {
            data: {
              ...this.recoveryData,
            },
          }
        )
        this.emailSent = data.status
        this.$store.dispatch('snackalert/updateSnackbar', {
          color: 'success',
          msg: data.message,
          show: true,
        })
      } catch (e) {
        let msg
        if (e.response) {
          msg = e.response.data.message
        } else {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
        }
        this.$store.dispatch('snackalert/updateSnackbar', {
          color: 'error',
          msg,
          show: true,
        })
      }
      this.loading = false
    },
  },
  head: {
    title: `Account Recovery`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: `${CONSTANTS.APP_NAME} account recovery page, Online maths schools`,
      },
    ],
  },
}
</script>

<style scoped></style>
