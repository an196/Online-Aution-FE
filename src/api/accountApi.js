import axiosClient from './axiosClient';

const prefix='accounts';

const adminApi = {
    getProfile(){
        const url = `/${prefix}/detail`;
        return axiosClient.get(url);
    },
    getWatchList(){
        const url = `/bidder/watch_list`;
        return axiosClient.get(url);
    },
    addWatchList(id){
        const url = `/bidder/watch_list?product_id=${id}`;
        return axiosClient.post(url);
    },
}

export default adminApi;