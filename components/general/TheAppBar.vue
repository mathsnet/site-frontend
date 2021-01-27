<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app color="primary" dark>
      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text" dark v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <div class="text-center mb-8">
          <v-btn outlined color="white" @click="logout"
            ><v-icon left>mdi-logout</v-icon>Logout</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar color="primary" fixed app>
      <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="white--text"
        ><v-btn exact text :to="{ name: 'index' }" dark>{{
          title
        }}</v-btn></v-toolbar-title
      >
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  props: {
    showNavBar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drawer: false,
      title: CONSTANTS.APP_NAME,
      studentItems: [
        {
          title: 'Dashboard',
          to: { name: 'student-dashboard' },
          icon: 'mdi-dashboard',
        },
        {
          title: 'Profile',
          to: { name: 'profile' },
          icon: 'mdi-account-circle-outline',
        },
      ],
      instructorItems: [
        {
          title: 'Dashboard',
          to: { name: 'instructor-dashboard' },
          icon: 'mdi-dashboard',
        },
      ],
      adminItems: [
        {
          title: 'Dashboard',
          to: { name: 'admin-dashboard' },
          icon: 'mdi-view-dashboard-outline',
        },
        {
          title: 'Courses',
          to: { name: 'admin-courses' },
          icon: 'mdi-book-open-outline',
        },
        {
          title: 'Topics',
          to: { name: 'admin-topics' },
          icon: 'mdi-book-open-page-variant-outline',
        },
        {
          title: 'Subscriptions',
          to: { name: 'admin-subscriptions' },
          icon: 'mdi-badge-account-horizontal-outline',
        },
        {
          title: 'Levels',
          to: { name: 'admin-levels' },
          icon: 'mdi-badge-account-horizontal-outline',
        },
        {
          title: 'Past Questions',
          to: { name: 'admin-pq' },
          icon: 'mdi-cast-education',
        },
        {
          title: 'Instructors',
          to: { name: 'admin-instructors' },
          icon: 'mdi-clipboard-account-outline',
        },
        {
          title: 'Students',
          to: { name: 'admin-students' },
          icon: 'mdi-account-supervisor-outline',
        },
        {
          title: 'Profile',
          to: { name: 'profile' },
          icon: 'mdi-account-circle-outline',
        },
      ],
    }
  },
  computed: {
    isAdmin() {
      if (this.$auth.user.user_type === CONSTANTS.USER_TYPES.ADMIN) return true
      return false
    },
    isInstructor() {
      if (this.$auth.user.user_type === CONSTANTS.USER_TYPES.INSTRUCTOR)
        return true
      return false
    },
    isStudent() {
      if (this.$auth.user.user_type === CONSTANTS.USER_TYPES.STUDENT)
        return true
      return false
    },
    items() {
      if (this.isAdmin) {
        return this.adminItems
      } else if (this.isInstructor) {
        return this.instructorItems
      } else if (this.isStudent) {
        return this.studentItems
      } else {
        return []
      }
    },
  },
  methods: {
    logout() {
      this.$router.push({ name: 'auth-logout' })
    },
  },
}
</script>

<style></style>
