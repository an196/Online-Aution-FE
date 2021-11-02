import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from "react-redux";
import {
    getTopItemRunOut,
    getTopHighestAutions,
    getTopHighestCost,
    selectRunOutItems,
    selectTopHighestCost,
    selectTopHighestAutions
} from '../features/product/productSlice';
import axios from 'axios';
import { NotifyHelper } from '../helper/NotifyHelper';

export default function Home(props) {
    const topItemRunOut = useSelector(selectRunOutItems);
    const topHighestCost = useSelector(selectTopHighestCost);
    const topHighestAutions = useSelector(selectTopHighestAutions);
    const [watchList, setWatchList] = useState();

    const dispach = useDispatch();

    function getWatchList() {
        let data = {
        };

        const config = {
            headers: {
                'x-access-token': localStorage.x_accessToken,
                'x-refresh-token': localStorage.x_refreshToken
            }
        }

        axios
            .get("http://localhost:3002/api/bidder/watch_list", config)
            .then(function (res) {
                console.log(res.data.watch_list);
                if (res.status === 200) {
                    setWatchList(res.data.watch_list);
                    console.log(res.data.watch_list);
                }

            })
            .catch(function (error) {
                NotifyHelper.error("Đã có lỗi xảy ra", "Thông báo");
            });
    }

    useEffect(() => {
        dispach(getTopItemRunOut());
        dispach(getTopHighestCost());
        dispach(getTopHighestAutions());

        if (localStorage.x_accessToken) {
            getWatchList();
        }

    }, [dispach]);



    return (
        <div className="container mt-4" >
            <Row xs={1}>
                <h5>Sản phẩm gần kết thúc</h5>
                <Row xs={1} md={5} className="g-4" >
                    {
                        topItemRunOut && topItemRunOut.length > 0
                            ? topItemRunOut.map((item) => (
                                <ProductCard key={item.auction_id} item={item} />
                            ))
                            : <h6 className='d-flex justify-content-center'>Không có sản phẩm!</h6>
                    }
                </Row>
            </Row>
            <Row xs={1} className="mt-5">
                <h5>Sản phẩm đấu giá nhiều nhất</h5>
                <Row xs={1} md={5} className="g-4" >
                    {
                        topHighestAutions && topHighestAutions.length > 0 ?
                            topHighestAutions.map((item) => (
                                <ProductCard key={item.auction_id} item={item} />
                            ))
                            : <h6 className='d-flex justify-content-center'>Không có sản phẩm!</h6>
                    }
                </Row>
            </Row>
            <Row xs={1} className="mt-5">
                <h5>Sản phẩm có giá cao nhất</h5>
                <Row xs={1} md={5} className="g-4" >
                    {
                        topHighestCost && topHighestCost.length > 0 ?
                            topHighestCost.map((item) => (
                                <ProductCard key={item.auction_id} item={item} />
                            ))
                            : <h6 className='d-flex justify-content-center'>Không có sản phẩm!</h6>
                    }
                </Row>
            </Row>
        </div>
    );
};
