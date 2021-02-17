<template>
  <div>
    <v-dialog v-model="show" :width="width" :max-width="width" persistent>
      <v-card>
        <v-card-text class="text-center mt-6 pt-7">
          <div class="mb-6">
            <div class="font-weight-bold">Reference Number:</div>
            <div class="primary--text">{{ referenceGen().toString() }}</div>
          </div>
          <paystack
            :embed="false"
            :amount="amount * 100"
            :email="email"
            :reference="reference"
            :paystackkey="paystackkey"
            :close="close"
            :callback="callback"
          >
            <v-icon>mdi-money</v-icon> MAKE PAYMENT
          </paystack>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn small outlined color="error" @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  name: 'PaymentDialog',
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 400,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      paystackkey: 'iiiiii',
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    email() {
      return this.user.email
    },
    fName() {
      return this.user.first_name
    },
    lName() {
      return this.user.last_name
    },
    reference() {
      return this.referenceGen()
    },
  },
  methods: {
    referenceGen() {
      let refN = `${CONSTANTS.APP_NAME}-REF-`
      const letters =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      for (let x = 0; x < 20; x++) {
        refN += letters.charAt(Math.floor(Math.random() * letters.length))
      }
      return refN
    },
    callback() {
      // eslint-disable-next-line no-console
      console.log('payment return')
    },
    close() {
      // eslint-disable-next-line no-console
      console.log('payment closed')
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
  },
}
</script>

<style scoped></style>
