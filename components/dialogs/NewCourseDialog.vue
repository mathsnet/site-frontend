<template>
  <div>
    <v-dialog
      v-model="showDialog"
      :max-width="maxWidth"
      :fullscreen="fullscreen"
      persistent
    >
      <v-card>
        <v-card-title class="primary--text"> Add New Course </v-card-title>
        <v-card-text>
          <div v-if="$fetchState.pending">
            {{ fetchPendingMessage }}
          </div>
          <div v-else-if="$fetchState.error">
            {{ fetchErrorMessage }}
          </div>
          <v-form
            v-else
            ref="newCourseForm"
            :value="valid"
            @submit.prevent="addNewCourse"
          >
            <v-text-field
              v-model="newCourseData.title"
              label="Course Title"
              :rules="rules.newCourseTitle"
            ></v-text-field>
            <v-textarea
              v-model="newCourseData.description"
              label="Course Description"
              :rules="rules.newCourseDescription"
            ></v-textarea>
            <v-select
              v-model="newCourseData.subscription"
              label="Course Level"
              :items="subscriptions"
              item-text="title"
              item-value="id"
              :rules="rules.newCourseLevel"
            ></v-select>
            <div class="text-center mt-7">
              <v-btn
                :loading="loading"
                color="primary"
                dark
                @click="addNewCourse"
                >Add</v-btn
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
import _ from 'lodash'
import { formRules } from '~/assets/javascript/formRules'
import { CONSTANTS } from '~/assets/javascript/constants'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: Number,
      default: 450,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
  },
  async fetch() {
    const { data } = await this.$axios.get(
      CONSTANTS.ROUTES.ADMIN.GET_SUBSCRIPTIONS
    )
    this.subscriptions = data.subscriptions
  },
  data() {
    return {
      rules: formRules,
      valid: false,
      newCourseData: {
        title: '',
        description: '',
        subscription: '',
      },
      loading: false,
      fetchPendingMessage: CONSTANTS.MESSAGES.FETCH_LOADING_DATA,
      fetchErrorMessage: CONSTANTS.MESSAGES.FETCH_LOADING_ERROR,
      subscriptions: [],
    }
  },
  computed: {},
  methods: {
    closeDialog() {
      this.clearData()
      this.$emit('closeDialog')
    },
    async addNewCourse() {
      if (!this.$refs.newCourseForm.validate()) {
        this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          CONSTANTS.MESSAGES.FORM_ERROR
        )
        return
      }
      this.loading = true
      try {
        this.newCourseData.title = _.capitalize(this.newCourseData.title)
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.ADMIN.ADD_COURSE,
          {
            data: this.newCourseData,
          }
        )
        this.$store.dispatch('snackalert/showSuccessSnackbar', data.message)
        this.$emit('reloadData')
        this.clearData()
      } catch (e) {
        let msg
        if (e.response) {
          msg = e.response.ta.message
        } else {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
        }
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
        console.log(e)
      }
      this.loading = false
      // this.closeDialog()
    },
    clearData() {
      this.newCourseData.title = ''
      this.newCourseData.description = ''
      this.newCourseData.subscription = ''
    },
  },
}
</script>

<style scoped></style>
