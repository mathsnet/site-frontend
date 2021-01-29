export const CONSTANTS = {
  APP_NAME: 'MathsNet',
  USER_TYPES: {
    STUDENT: '1',
    INSTRUCTOR: '2',
    ADMIN: '3',
  },
  ROUTES: {
    BASE_URL: 'http://localhost:5000/api/v1/',
    ADMIN: {
      ADD_COURSE: 'admin/add/course',
      UPDATE_COURSE: 'admin/update/course',
      ADD_SUBSCRIPTION: 'admin/add/subscription',
      UPDATE_SUBSCRIPTION: 'admin/update/subscription',
      GET_COURSES: 'admin/get/courses',
      GET_SUBSCRIPTIONS: 'admin/get/subscriptions',
    },
    AUTH: {
      LOGIN: 'auth/login',
      SIGNUP: 'auth/signup',
      LOGOUT: 'auth/logout',
      USER: 'auth/get-user',
    },
  },
  MESSAGES: {
    NO_VALID_CREDENTIALS: 'No credentials supplied, Please try again',
    INVALID_CREDENTIALS:
      'Sorry! Invalid credentials supplied, Please try again',
    NEW_ACCOUNT_SUCCESSFUL: 'Account created successfully',
    LOGOUT_SUCCESSFUL: 'Your account has been logged out successfully',
    UNKNOWN_ERROR: 'Unknown Error occurred. Please try again',
    INVALID_USERNAME: 'Invalid Username supplied. Please choose another one',
    LOGIN_SUC: 'Account Logged-in successfully',
    LOGIN_ERR: 'Sorry, Your username/email or password is incorrect',
    NO_USER: "Sorry, We can't find the user with the detail(s) supplied",
    USER_EXIST:
      'Sorry! This Username has been registered. Choose another one for your account',
    EMAIL_EXIST:
      'Sorry! This Email has been registered. Choose another one for your account',
    FORM_ERROR: 'Please fill the form properly',
    LOGIN_REQUIRED: 'Please login first before you can access that page',
    ADMIN_REQUIRED: 'Sorry! only super users can access that page',
    INSTRUCTOR_REQUIRED: 'Sorry! only instructors can access that page',
    STUDENT_REQUIRED: 'Sorry! only students can access that page',
    ALREADY_LOGIN:
      'Please Logout first before you can have access to that page',
    FETCH_LOADING_ERROR:
      'Error Occurred while fetching the data. Please reload the page',
    FETCH_LOADING_SUCCESS: 'Data Fetched successfully',
    FETCH_LOADING_DATA: 'Loading Data.........',
    NO_DATA_TO_DISPLAY: 'SORRY! NO DATA AVAILABLE TO DISPLAY',
  },
}
