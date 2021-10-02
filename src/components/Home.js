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

export default function Home(props) {
    const topItemRunOut = useSelector(selectRunOutItems);
    const topHighestCost = useSelector(selectTopHighestCost);
    const topHighestAutions = useSelector(selectTopHighestAutions);

    const dispath = useDispatch();

    useEffect(() => {
        dispath(getTopItemRunOut());
        dispath(getTopHighestCost());
        dispath(getTopHighestAutions());
    },[dispath]);

   

    return (
        <div className="container mt-4" >
            <Row xs={1}>
                <h5>Sản phẩm gần kết thúc</h5>
                <Row xs={1} md={5} className="g-4" >
                    {topItemRunOut.map((item) => (
                        <ProductCard key={item.auction_id} item={item}/>
                    ))}
                </Row>
            </Row>
            <Row xs={1} className="mt-5">
                <h5>Sản phẩm đấu giá nhiều nhất</h5>
                <Row xs={1} md={5} className="g-4" >
                    {topHighestAutions.map((item) => (
                       <ProductCard key={item.auction_id} item={item}/>
                    ))}
                </Row>
            </Row>
            <Row xs={1} className="mt-5">
                <h5>Sản phẩm có giá cao nhất</h5>
                <Row xs={1} md={5} className="g-4" >
                    {topHighestCost.map((item) => (
                       <ProductCard key={item.auction_id} item={item}/>
                    ))}
                </Row>
            </Row>
        </div>
    );
};
