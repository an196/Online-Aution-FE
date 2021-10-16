import axiosClient from './axiosClient';

const prefix='accounts';

const adminApi = {
    getProfile(id){
        const url = `/${prefix}/detail/${id}`;
        return axiosClient.get(url);
    },
   
}

export default adminApi;