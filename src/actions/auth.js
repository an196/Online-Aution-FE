const logout = () => {
    localStorage.removeItem("x-accessToken");
    localStorage.removeItem("x-refreshToken");

  };

  export default {
    logout
  };