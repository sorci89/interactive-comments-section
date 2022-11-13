import axios from "axios";

export const httpApi = () => {
  const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    timeout: 3000,
  });

  const get = async (path) => {
    try {
      const resp = await instance.get(path, {
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      });
      return resp.data;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };

  const post = async (path, data) => {
    try {
      const resp = await instance.post(path, data, {
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      });
      return resp.data;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };

  const put = async (path, data) => {
    try {
      const resp = await instance.put(path, data, {
        headers: {
          authorization: sessionStorage.getItem("token"),
        },
      });
      return resp.data;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };

  return { get, post, put };
};
