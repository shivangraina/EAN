export const getFromdata = data => {
  const formData = new FormData();

  Object.entries(data).map(item => {
    formData.append(item[0], item[1] as Blob | string);
  });

  return formData;
};
