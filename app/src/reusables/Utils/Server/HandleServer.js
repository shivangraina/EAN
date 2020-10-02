// Create your own responses here , after getting the return code
// BoilerPlate for response handling

export const handleResponse = (response) => {
  switch (response.status) {
    case 200:
      return {
        data: response.data,
        err: null,
        status: response.status,
      };

    default:
      return { data: 'Null', err: null };
  }
};

export const handleError = (err) => {
  switch (err.status) {
    case undefined:
      return { data: null, err: 'Network Error', status: 500 };
    default:
      return { data: null, err: 'Server Error', status: 500 };
  }
};
