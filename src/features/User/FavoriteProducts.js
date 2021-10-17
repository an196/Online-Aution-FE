import { Card, Row, Col } from 'react-bootstrap';
import UserNavBar from '../../components/UserNavBar';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectWatchList, getWatchList } from './UserSlice';
import WatchListCard from '../../components/WatchListCard'


export default function FavoriteProducts() {
    const watchList = useSelector(selectWatchList);
    const dispatch = useDispatch();
    


    useEffect(() => {
        dispatch(getWatchList())
    }, [dispatch])

    console.log(watchList)
    return (
        <div className="container">
            <UserNavBar />
            <h5 className="d-flex justify-content-center mt-4">Sản phẩm yêu thích của bạn!</h5>
            <div className="card mb-3 mt-4 no-gutters" >
                <div className="row no-gutters m-auto p-auto">
                    <Row className=" mt-4 m-auto p-auto">
                        <Row xs={1} md={5} className="g-4 m-auto mb-3" >
                            {watchList ? watchList.map((item) => (
                                <WatchListCard key={item.product_id} item={item}>
                                </WatchListCard>
                            )) : null}
                        </Row>
                    </Row>
                </div>
            </div>
        </div>
    )
}