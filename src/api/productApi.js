import axiosClient from './axiosClient';

const prefix='products';

const productApi = {
    getTopItemRunOut(){
        const url = `/${prefix}/home/top-5-time-run-out`;
        return axiosClient.get(url);
    },
    getTopHighestCost(){
        const url = `/${prefix}/home/top-5-highest-cost`;
        return axiosClient.get(url);
    },
    getTopHighestAutions(){
        const url = `/${prefix}/home/top-5-highest-auctions`;
        return axiosClient.get(url);
    }
}

export default productApi;