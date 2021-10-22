import { useEffect, useState } from 'react';
import { Pagination, Row, Form, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import {
    selectProductsByCategory,
    getProductsByCategory,
    selectCategoryName,
} from '../features/product/productSlice';
import { formatDateTime, formatProductName } from '../utils/utils';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from "react-redux";
import { selectWatchList, getWatchList } from '../features/User/UserSlice';

export default function Category(props) {
    const products = useSelector(selectProductsByCategory);
    const category = useSelector(selectCategoryName);
    const { id } = useParams();
    const dispatch = useDispatch();
    const watchList = useSelector(selectWatchList);

    //pagiantion
    const [totalPage, setTotalPage] = useState();
    const [currentPage, setCurentPage] = useState(1);
    const [isNextPage, setIsNextPage] = useState();
    const [isPreviousPage, setIsPreviousPage] = useState();
    const productPerPage = 5;

    //data to show
    const [data, setData] = useState();

    useEffect(() => {
        dispatch(getProductsByCategory(id));

        if (localStorage.x_accessToken) {
            dispatch(getWatchList());
        }

        //pagination

        if (products) {
            const t = Math.ceil(products.length / 5);
            setTotalPage(t);
            console.log(t)
        }

        if (currentPage === 1) {
            setIsPreviousPage(false);
        } else {
            setIsPreviousPage(true);
        }

        if (currentPage === totalPage) {
            setIsNextPage(false);
        } else {
            setIsNextPage(true);
        }

        //fetch data
        setData(products.filter((_, index) => (index <= currentPage * productPerPage - 1 && index >= (currentPage - 1) * productPerPage)));

    }, [dispatch, currentPage]);


    function handlePreviousPage() {
        if (currentPage !== 1) {
            setCurentPage(currentPage - 1);
        }
    }

    function handleNextPage() {
        if (currentPage !== totalPage) {
            setCurentPage(currentPage + 1);
        }
    }

    console.log(currentPage)
    console.log(data)
    return (
        <div className="container mt-4" fluid>
            <Row>
                <Col md={6}>
                    <h5 className='mb-4'>Danh mục: {data ? category : null}</h5>
                </Col>
                <Col></Col>
                <Col md={3}>
                    <Form.Select size="sm">
                        <option value="newest">Mới nhất</option>
                        <option value="ascending">Giá tăng dần</option>
                    </Form.Select>
                </Col>

            </Row>

            <Row xs={1} md={5} className="g-4 "  >
                {data.map((item) => (
                    <ProductCard key={item.auction_id} item={item} watchList={watchList} />
                ))}
            </Row>
            <div style={{ height: '2rem' }}></div>
            <Pagination className='d-flex justify-content-center'>
                <Pagination.Prev disabled={!isPreviousPage} onClick={handlePreviousPage} />
                {Array.from({ length: totalPage }).map((_, index) => (
                    <Pagination.Item active={index + 1 === currentPage} onClick={() => setCurentPage(index + 1)}>{index + 1}
                    </Pagination.Item>
                ))}

                <Pagination.Next disabled={!isNextPage} onClick={handleNextPage} />

            </Pagination>

        </div>
    )
}