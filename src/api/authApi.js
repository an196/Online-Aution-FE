import axiosClient from '../utils/utils';

export default authApi = {
    signUp(data) {
        const url = "/auth/sign-up";
    
        return axiosClient.post(url, data);
      },
    
      signIn(data) {
        const url = "/auth/sign-in";
    
        return axiosClient.post(url, data);
      },
}