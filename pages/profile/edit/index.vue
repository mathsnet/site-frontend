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
                <v-avatar
                  :size="avatarSize"
                  color="primary"
                  @click="showDPUpload"
                >
                  <v-overlay absolute :value="dpOverlay">
                    <v-progress-circular indeterminate size="40" />
                  </v-overlay>
                  <span v-if="!dpAvailable" class="text-h2 white--text"
                    >DP</span
                  >
                  <v-img v-else :src="profileDP">
                    <template #placeholder>
                      <v-row
                        justify="center"
                        align="center"
                        class="fill-height"
                      >
                        <v-progress-circular indeterminate />
                      </v-row>
                    </template>
                  </v-img>
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
    <div class="d-none">
      <input
        ref="filechooser"
        type="file"
        accept=".jpeg, .jpg, .png"
        @change="uploadDP($event)"
      />
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
      dpOverlay: false,
    }
  },
  computed: {
    profileDP() {
      return this.$auth.user.dp_link
    },
    dpAvailable() {
      return !!this.profileDP
    },
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
    showDPUpload() {
      this.$refs.filechooser.click()
    },
    async uploadDP(e) {
      const file = e.target.files[0]
      const dpSize = file.size
      const dpExt = file.name.split('.').pop().toLowerCase()
      if (dpSize > CONSTANTS.ALLOWED_FILE_SIZE_DP) {
        const msg = `Maximum file size for profile photo is ${
          CONSTANTS.ALLOWED_FILE_SIZE_DP / 1024
        }KB`
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
        return
      }
      if (!CONSTANTS.ALLOWED_EXTENSIONS_FOR_DP.includes(dpExt)) {
        const msg = `Allowed Extensions: ${_.join(
          CONSTANTS.ALLOWED_EXTENSIONS_FOR_DP
        )}`
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
        return
      }
      this.dpOverlay = true
      this.$store.dispatch('actionoverlay/updateOverlayAction', true, 0.75)
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(f)
        })

      const fdata = await readData(file)
      const clInstance = this.$cloudinary.upload(fdata, {
        folder: 'images',
        uploadPreset: 'image_preset',
      })
      clInstance
        .then((d) => this.updateDPLink(d.secure_url))
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e)
          this.$store.dispatch(
            'snackalert/showErrorSnackbar',
            'Error Occurred While Uploading Your Image'
          )
        })
      this.dpOverlay = false
      this.$store.dispatch('actionoverlay/updateOverlayAction', false)
    },
    async updateDPLink(url) {
      try {
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.GENERAL.UPDATE_DP_LINK,
          {
            dp_link: url,
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
    },
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
