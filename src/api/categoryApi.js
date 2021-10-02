import axiosClient from './axiosClient';

const prefix='categorys';

const productApi = {
    getTypeList(){
        const url = `/${prefix}`;
        return axiosClient.get(url);
    },
 
}

export default productApi;