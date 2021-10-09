import axiosClient from './axiosClient';

const prefix='admin';

const adminApi = {
    getProduct(){
        const url = `/${prefix}/product`;
        return axiosClient.get(url);
    },
    removeProduct(id){
        const url = `/${prefix}/product/removeProduct?id=${id}`;
        return axiosClient.patch(url);
    },

}

export default adminApi;