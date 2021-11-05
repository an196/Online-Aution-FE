import { useEffect, useState } from 'react';
import { Pagination, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from "react-redux";
import { getSearchResult, selectSearchResult } from '../features/product/productSlice';
import { useLocation } from "react-router-dom";

export default function Category(props) {
    const searchResult = useSelector(selectSearchResult);
    const dispath = useDispatch();
    const location = useLocation();

    //get query params
    const search = window.location.search;
    const query = new URLSearchParams(search);
    const searchText = query.get('search');


    //pagiantion
    const [totalPage, setTotalPage] = useState();
    const [currentPage, setCurentPage] = useState(1);
    const [isNextPage, setIsNextPage] = useState();
    const [isPreviousPage, setIsPreviousPage] = useState();
    const productPerPage = 5;


    //data to show
    const [data, setData] = useState([]);


    //handle -------------------------------------------------------------------------------------------------------------------------->
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

    function pagination() {


        if (currentPage === 1) {
            setIsPreviousPage(false);
            setIsNextPage(true);
        } else {
            setIsPreviousPage(true);
        }

        if (currentPage === totalPage) {
            setIsNextPage(false);
            setIsPreviousPage(true);
        } else {
            setIsNextPage(true);
        }
    }

    // effect ------------------------------------------------------------------------------------------------------------------------->
    useEffect(() => {
        dispath(getSearchResult(searchText));

    }, [dispath, location]);

    useEffect(() => {
        if (searchResult) {


            setData(searchResult
                .filter((_, index) => (index <= currentPage * productPerPage - 1 && index >= (currentPage - 1) * productPerPage)));

            pagination();
        }
        console.log(data)
    }, [currentPage]);


    useEffect(() => {
        if (searchResult && searchResult.length > 0) {
            setData(searchResult.filter((_, index) => (index <= currentPage * productPerPage - 1 && index >= (currentPage - 1) * productPerPage)));
            const t = Math.ceil(searchResult.length / productPerPage);
            setTotalPage(t);
            setCurentPage(1);
            pagination();
        }

    }, [searchResult]);

    console.log(searchResult)
    return (
        <div className="container mt-4" >
            <h5 className='mb-4'>Kết quả tìm kiếm: {searchText ? searchText : null}</h5>
            <Row xs={1} md={5} className="g-4 "  >
                {data ? data.map((item) => (
                    <ProductCard key={item.auction_id} item={item} />
                ))
                    : <h6>Không có dữ liệu!</h6>
                }
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