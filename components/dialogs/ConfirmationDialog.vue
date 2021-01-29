<template>
  <div>
    <v-dialog v-model="openDialog" :width="width" persistent>
      <v-card>
        <v-card-title class="headline">
          {{ title }}
        </v-card-title>
        <v-divider v-if="title"></v-divider>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="success" small @click="actionTaken('yes')"
            >Yes</v-btn
          >
          <v-btn text color="primary" small @click="actionTaken('cancel')"
            >Cancel</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationDialog',
  props: {
    openDialog: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 290,
    },
    message: {
      type: String,
      default: 'Are you sure you want to perform this operation?',
    },
    title: {
      type: String,
      default: null,
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    actionTaken(action) {
      action === 'yes'
        ? this.$emit('YesAnswer', { ...this.item })
        : this.$emit('CancelAnswer', { ...this.item })
    },
  },
}
</script>

<style scoped></style>
