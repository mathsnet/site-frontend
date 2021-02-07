export const formRules = {
  username: [
    (v) => !!v || 'Username required',
    (v) => /\w+/.test(v) || 'Invalid Username supplied',
  ],
  firstName: [(v) => !!v || 'First Name required'],
  lastName: [(v) => !!v || 'Last Name required'],
  email: [
    (v) => !!v || 'Email is required',
    (v) => /^\w+@\w+\.\w{2,}$/.test(v) || 'Invalide email',
  ],
  password: [
    (v) => !!v || 'Password is required',
    (v) => v.length > 5 || 'Minimum length is 6',
  ],
  passwordLogin: [(v) => !!v || 'Password is required'],
  usernameEmail: [(v) => !!v || 'Username/Email is required'],
  newCourseTitle: [(v) => !!v || 'Title is required'],
  newCourseDescription: [(v) => !!v || 'Description is required'],
  newCourseSubscription: [(v) => !!v || 'Subscription Type is required'],
  newCourseLevel: [(v) => !!v || 'Course Level is required'],
  newSubscriptionTitle: [(v) => !!v || 'Subscription Title is required'],
  newSubscriptionDescription: [
    (v) => !!v || 'Subscription Description is required',
  ],
  newSubscriptionDuration: [
    (v) => !!v || 'Subscription Duration is required',
    (v) => /\d+/.test(v) || 'Please enter a valid duration',
  ],
  newSubscriptionPrice: [
    (v) => !!v || 'Subscription Price is required',
    (v) => /\d+/.test(v) || 'Please enter a valid price',
  ],
  thumbnailLink: [
    (v) => !!v || 'This Field is required',
    (v) => /\w{0,250}/.test(v) || 'Maximum length is 250',
  ],
  fieldRequired: [(v) => !!v || 'This Field is required'],
}

// const required = (v, msg) => !!v || msg
