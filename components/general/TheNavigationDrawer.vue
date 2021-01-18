<template>
  <div>
    <v-navigation-drawer v-model="showNavBar" app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="primary--text" dark v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: {
    showNavBar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [
        {
          title: 'Dashboard',
          to: '/dashboard',
          icon: 'mdi-dashboard',
        },
      ],
    }
  },
}
</script>

<style></style>
