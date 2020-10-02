export const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/'
    // :  'https://eanbackend.herokuapp.com/';
    :  'http://139.59.3.160/api/';
