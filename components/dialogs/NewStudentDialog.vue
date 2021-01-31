<template>
  <div>
    <v-dialog v-model="openDialog" :width="width" persistent>
      <v-card>
        <v-card-title class="primary--text">Add New Student</v-card-title>
        <v-card-text>
          <v-form
            ref="newUserForm"
            v-model="valid"
            @submit.prevent="addNewStudent"
          >
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="signupData.firstName"
                  label="First Name"
                  hint="Enter the Student Name"
                  :rules="rules.firstName"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="signupData.lastName"
                  label="Last Name"
                  hint="Enter the Family Name"
                  :rules="rules.lastName"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="signupData.username"
              label="Username"
              hint="Enter the unique name as username"
              :rules="rules.username"
            >
            </v-text-field>
            <v-text-field
              v-model="signupData.email"
              label="Email"
              hint="Enter the email address"
              :rules="rules.email"
              type="email"
            >
            </v-text-field>
            <v-text-field
              v-model="signupData.password"
              label="Password"
              hint="Enter the account password"
              :rules="rules.password"
              type="password"
            >
            </v-text-field>
            <div class="text-center mt-4 mb-3">
              <v-btn
                outlined
                small
                color="primary"
                :loading="loading"
                type="submit"
                >Create Account</v-btn
              >
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-small text color="error" @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'
import { formRules } from '~/assets/javascript/formRules'
export default {
  name: 'NewStudentDialog',
  props: {
    openDialog: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 450,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
  },
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
  computed: {},
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
    async addNewStudent() {
      if (!this.$refs.newUserForm.validate()) {
        this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          CONSTANTS.MESSAGES.FORM_ERROR
        )
        return
      }
      this.loading = true
      try {
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.ADMIN.ADD_STUDENT,
          {
            data: this.signupData,
          }
        )
        this.$store.dispatch('snackalert/showSuccessSnackbar', data.message)
        this.$emit('reloadData')
        this.closeDialog()
      } catch (e) {
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
}
</script>

<style scoped></style>
