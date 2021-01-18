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
}

// const required = (v, msg) => !!v || msg
