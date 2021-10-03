import { useEffect} from 'react';
import { Pagination, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { 
    selectProductsByCategory,
    getProductsByCategory,
} from '../features/product/productSlice';
import { formatDateTime, formatProductName } from '../utils/utils';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from "react-redux";


export default function Category(props) {
    const products = useSelector(selectProductsByCategory);
    const { id } = useParams();
    const dispath = useDispatch();

    useEffect(() => {
        dispath(getProductsByCategory(id));

    }, [dispath,id]);

    console.log(products);
    return (
        <div className="container mt-4" >
            <h5>Danh mục:</h5>
            <Row xs={1} md={5} className="g-4" >
                    {products.map((item) => (
                        <ProductCard key={item.auction_id} item={item}/>
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