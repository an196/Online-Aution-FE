import axiosClient from './axiosClient';

const prefix='admin';

const adminApi = {
    getProduct(){
        const data={};
        const url = `/${prefix}/product`;
        return axiosClient.get(url);
    },
    removeProductp(){
        const data={};
        const url = `/${prefix}/product`;
        return axiosClient.get(url);
    },

}

export default adminApi;