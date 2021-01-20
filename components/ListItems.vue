<template>
  <v-list dense flat :color="$vuetify.theme.themes.light.background">
    <v-list-item v-for="(item, i) in items" :key="i" exact nuxt :to="item.to">
      <v-list-item-title class="primary--text">{{
        item.name
      }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'ListItems',
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
}
</script>

<style scoped></style>
