const handleRequestError = data => {
  const { errors } = data;

  return data;
};

const handleLogResponse = data => {
  if (data) {
    console.log(JSON.stringify(data));
  }
  return data;
};

export default {
  handleLogResponse,
  handleRequestError,
};
