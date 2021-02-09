<template>
  <div>
    <div class="mt-10 mt-md-12">
      <v-row align="center" class="fill-height">
        <v-col cols="12" md="8" offset-md="2">
          <v-card elevation="7">
            <v-sheet color="primary" :height="sheetHeight">
              <div
                class="mb-3 mb-md-7 mt-6 pt-2 pt-md-5 text-center white--text text-h4 text-md-h3 font-weight-bold"
              >
                EDIT PROFILE
              </div>
            </v-sheet>
            <v-card-text>
              <div class="text-center mb-6">
                <v-avatar :size="avatarSize" color="primary">
                  <span class="text-h2 white--text">DP</span>
                </v-avatar>
              </div>
              <div class="text-center mb-5 mb-md-9">
                <v-form ref="eform" v-model="valid">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="user.first_name"
                        label="First Name"
                        :rules="rules.fieldRequired"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="user.last_name"
                        label="Last Name"
                        :rules="rules.fieldRequired"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="user.email"
                        label="Email"
                        :rules="rules.fieldRequired"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        v-model="user.bio"
                        label="About Me"
                        :rules="rules.fieldRequired"
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </div>
              <v-divider />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                outlined
                color="primary"
                class="text-capitalize mb-5"
                :loading="loading"
                @click="updateProfile"
                >Save</v-btn
              >
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { formRules } from '~/assets/javascript/formRules'
import { CONSTANTS } from '~/assets/javascript/constants'
export default {
  middleware: ['authenticate'],
  data() {
    return {
      user: this.$auth.user,
      l_: _,
      rules: formRules,
      valid: false,
      loading: false,
    }
  },
  computed: {
    sheetHeight() {
      return this.$vuetify.breakpoint.smAndDown ? '50px' : '100px'
    },
    avatarSize() {
      return this.$vuetify.breakpoint.xsOnly
        ? '150'
        : this.$vuetify.breakpoint.smOnly
        ? '200'
        : '270'
    },
  },
  methods: {
    async updateProfile() {
      if (!this.$refs.eform.validate()) {
        this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          CONSTANTS.MESSAGES.FORM_ERROR
        )
        return
      }
      this.loading = true
      try {
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.GENERAL.UPDATE_PROFILE,
          {
            data: this.user,
          }
        )
        this.$store.dispatch('snackalert/showSuccessSnackbar', data.message)
        this.$auth.fetchUser()
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
    title: 'Edit Profile',
  },
}
</script>

<style scoped></style>
