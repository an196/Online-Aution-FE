import { useEffect} from 'react';
import { Pagination, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { 
    selectProductsByCategory,
    getProductsByCategory,
    selectCategoryName,
} from '../features/product/productSlice';
import { formatDateTime, formatProductName } from '../utils/utils';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from "react-redux";
import {selectWatchList, getWatchList} from '../features/User/UserSlice';

export default function Category(props) {
    const products = useSelector(selectProductsByCategory);
    const category = useSelector(selectCategoryName);
    const { id } = useParams();
    const dispatch = useDispatch();
    const watchList = useSelector(selectWatchList);

    useEffect(() => {
        dispatch(getProductsByCategory(id));

        if(localStorage.x_accessToken){
            dispatch(getWatchList());
        }
    }, [dispatch,id]);

    return (
        <div className="container mt-4" fluid>
            <h5 className='mb-4'>Danh mục: {products? category : null}</h5>
            <Row xs={1} md={5} className="g-4 "  >
                    {products.map((item) => (
                        <ProductCard key={item.auction_id} item={item} watchList={watchList}/>
                    ))}
                </Row>
            <div style= {{height:'2rem'}}></div>
            <Pagination className='d-flex justify-content-center'>
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item >{4}</Pagination.Item>
                <Pagination.Next />
                
            </Pagination>
        </div>
    )
}