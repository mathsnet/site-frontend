<template>
  <div>
    <v-dialog
      v-model="open"
      persistent
      :width="width"
      scrollable
      :max-width="width"
    >
      <v-card>
        <v-card-title class="font-weight-bold primary--text my-5">{{
          title
        }}</v-card-title>
        <v-card-text>
          {{ text }}
          <v-divider />
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
export default {
  name: 'FullDescriptionDialog',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'Description',
    },
    width: {
      type: Number,
      default: 380,
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
  },
}
</script>

<style scoped></style>
