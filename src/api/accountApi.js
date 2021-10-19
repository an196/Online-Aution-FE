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
        const data ={
            product_id: id
        }
        const url = `/bidder/watch_list?product_id=${id}`;
        return axiosClient.post(url,data);
    },
    removeWatchList(id){
        const data ={
            product_id: id
        }
        const url = `/bidder/watch_list?product_id=${id}`;
        return axiosClient.delete(url,data);
    },
    getReviews(id){
        const url = `/evaluation_historys/${id}`;
        return axiosClient.get(url);
    },
}

export default adminApi;