import { useEffect} from 'react';
import { Pagination, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from "react-redux";
import { getSearchResult,selectSearchResult } from '../features/product/productSlice';

export default function Category(props) {
    const searchResult = useSelector(selectSearchResult);
    const dispath = useDispatch();

    //get query params
    const search = window.location.search;
    const query = new URLSearchParams(search);
    const searchText = query.get('search');

    useEffect(() => {
        dispath(getSearchResult(searchText));

    }, [dispath,searchText]);
    console.log(searchResult)
    return (
        <div className="container mt-4" fluid>
            <h5 className='mb-4'>Kết quả tìm kiếm: {searchText ? searchText : null}</h5>
            <Row xs={1} md={5} className="g-4 "  >
                    {searchResult.map((item) => (
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