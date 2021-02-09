<template>
  <div class="mt-10 mt-md-12">
    <v-row align="center" class="fill-height">
      <v-col cols="12" md="8" offset-md="2">
        <v-card elevation="7">
          <v-sheet color="primary" :height="sheetHeight">
            <div
              class="mb-3 mb-md-7 mt-6 pt-2 pt-md-5 text-center white--text text-h4 text-md-h3 font-weight-bold"
            >
              PROFILE
            </div>
          </v-sheet>
          <v-card-text>
            <div class="text-center mb-3">
              <v-avatar :size="avatarSize" color="primary">
                <span class="text-h2 white--text">DP</span>
              </v-avatar>
            </div>
            <div class="text-center">
              <div class="text-h5 text-md-h4 primary--text font-weight-bold">
                {{ l_.capitalize(user.first_name) }}
                {{ l_.capitalize(user.last_name) }}
              </div>
              <div class="text-subtitle-2 grey--text darken-2 mt-n1">
                {{ user.email }}
              </div>
              <div class="mt-10 mb-9">
                <div class="text-h5 font-weight-bold">About Me</div>
                <div class="text-body-2 text-md-subtitle-1">{{ userBio }}</div>
              </div>
            </div>
            <v-divider />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              outlined
              color="primary"
              class="text-capitalize mb-5"
              :to="{ name: 'profile-edit' }"
              >Edit Profile</v-btn
            >
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import _ from 'lodash'
import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  middleware: ['authenticate'],
  data() {
    return {
      user: this.$auth.user,
      USER_HOLDER: CONSTANTS.USER_TYPES_TEXT,
      l_: _,
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
    userBio() {
      if (this.user.bio) {
        return this.user.bio
      } else {
        return 'No text to display right now, use the edit button to add about me'
      }
    },
  },
  head: {
    title: `Profile`,
  },
}
</script>

<style scoped></style>
