<template>
  <div>
    <v-navigation-drawer v-model="showNavBar" absolute app color="primary" dark>
      <v-list nav>
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
      studentItems: [
        {
          title: 'Dashboard',
          to: { name: 'student-dashboard' },
          icon: 'mdi-dashboard',
        },
        {
          title: 'Profile',
          to: { name: 'profile' },
          icon: 'mdi-user',
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
          icon: 'mdi-dashboard',
        },
        {
          title: 'Courses',
          to: { name: 'admin-courses' },
          icon: 'mdi-books',
        },
        {
          title: 'Topics',
          to: { name: 'admin-topics' },
          icon: 'mdi-books',
        },
        {
          title: 'Levels',
          to: { name: 'admin-levels' },
          icon: 'mdi-books',
        },
        {
          title: 'Past Questions',
          to: { name: 'admin-pq' },
          icon: 'mdi-books',
        },
        {
          title: 'Instructors',
          to: { name: 'admin-instructors' },
          icon: 'mdi-books',
        },
        {
          title: 'Students',
          to: { name: 'admin-students' },
          icon: 'mdi-books',
        },
        {
          title: 'Students',
          to: { name: 'profile' },
          icon: 'mdi-user-circle-alt',
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
