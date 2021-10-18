
import { Image, Row, Col, Button } from 'react-bootstrap';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineHistory } from "react-icons/ai";
import { ImHammer2 } from "react-icons/im";
import { useState, useEffect } from 'react';
import AutionHistory from '../components/AutionHistory';
import ProductCard from './ProductCard';
import ReactHtmlParser from "react-html-parser";
import { formatDateTime, formatProductName } from '../utils/utils';
import { selectWatchList, getWatchList, removeProductfromWatchList } from '../features/User/UserSlice';
import {
    selectInfoProduct,
    getInfoProduct,
    selectRelationProduct,
} from '../features/product/productSlice';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import axios from 'axios';
import { NotifyHelper } from '../helper/NotifyHelper';
import jwt_decode from 'jwt-decode';

const styles = {
    card: {
        //backgroundColor: '#B7E0F2',
        borderRadius: 5,
        width: '8.8rem'
    },
    cardImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        maxHeight: '20rem',
    },
    cardTitle: {
        fontSize: '0.8rem',
    },
    cardBody: {
        width: '8.8rem'
    },
    cardText: {
        fontSize: '0.6rem'
    }
}

export default function ProductDetail({ props }) {
    const infoProduct = useSelector(selectInfoProduct);
    const realationProduct = useSelector(selectRelationProduct);
    const { id } = useParams();
    const [like, setlike] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const watchList = useSelector(selectWatchList);
    const [validUser, setValidUser] = useState(false);
    const dispatch = useDispatch();


    function addWatchList() {
        const data = {
            product_id: Number(id)
        };

        let headers = {};
        headers['x-access-token'] = localStorage.x_accessToken ? localStorage.x_accessToken : null;
        headers['x-refresh-token'] = localStorage.x_refreshToken ? localStorage.x_refreshToken : null;

        let config = {
            headers: { ...headers }
        }

        axios
            .post(`http://localhost:3002/api/bidder/watch_list?product_id=${id}`, data, config)
            .then(function (res) {
                if (res.status === 200) {
                    NotifyHelper.success(res.data.message, "Thông báo")
                }

            })
            .catch(function (error) {
                NotifyHelper.error(error, "Thông báo");

            });
    }

    function removeWatchList() {

        let headers = {};
        headers['x-access-token'] = localStorage.x_accessToken ? localStorage.x_accessToken : null;
        headers['x-refresh-token'] = localStorage.x_refreshToken ? localStorage.x_refreshToken : null;

        let config = {
            headers: { ...headers }
        }

        axios
            .delete(`http://localhost:3002/api/bidder/watch_list?product_id=${id}`, config)
            .then(function (res) {
                if (res.status === 200) {
                    NotifyHelper.success(res.data.message, "Thông báo");

                }
            })
            .catch(function (error) {
                NotifyHelper.error(error, "Thông báo");
            });
    }

    function handleLike(e) {
        if (like) {
            removeWatchList();
            setlike(false);

        }
        else {
            addWatchList();
            setlike(true);
        }
    }

    const data = {
        ...infoProduct,
        start_day: formatDateTime(infoProduct.created_at),
        buy_now: formatDateTime(infoProduct.buy_now),
        end_day: formatDateTime(infoProduct.end_day),
    }

    useEffect(() => {
        dispatch(getInfoProduct(id));

        if (localStorage.x_accessToken) {
            dispatch(getWatchList());
            setValidUser(true);
            if (watchList.some(item => Number(id) === item.product_id))
                setlike(true);
        }
    }, [dispatch, getInfoProduct, getWatchList]);



    return (
        <>
            <div className="card mb-3 mt-4 no-gutters" >
                <div className="row no-gutters">
                    {data ?
                        <Row >
                            <Col className="col-md-4 m-2">
                                <Row >
                                    <title>Placeholder</title>

                                    <Image src={data.image ? data.image[0] : ''} style={styles.cardImage} />
                                </Row>
                                <div style={{ height: 10 }}></div>
                                <Row xs={1} md={3} className="m-1">
                                    <Image
                                        src={data.image ? data.image[1] : ''} fluid />
                                    <Image
                                        src={data.image ? data.image[2] : ''} fluid />
                                    <Image
                                        src={data.image ? data.image[3] : ''} fluid />

                                </Row>
                                <div style={{ height: 20 }}></div>
                                <Row>
                                    {
                                        validUser ?
                                            <p role='button' className='d-flex justify-content-center' onClick={handleLike}>
                                                {like ? <AiFillHeart style={{ color: 'red' }} /> : <AiOutlineHeart />}
                                            </p>
                                            : null
                                    }
                                </Row>
                            </Col >
                            <Col className="col-md-7 m-2">
                                <div >
                                    <div className="card-body">
                                        <h5 className="card-title">{data.name}
                                        </h5>
                                        <p className="card-text">
                                            Giá hiện tại: {data.start_cost}₫ <br />
                                            <Button variant="success"> <AiOutlineShoppingCart></AiOutlineShoppingCart>&nbsp; Mua ngay
                                            </Button> {data.buy_now} <br />
                                            Người bán: {data.seller_name} &nbsp;&nbsp;&nbsp;&nbsp;  Đánh giá: {data.evaluation_score} điểm
                                            <br />
                                            Đăng: {data.start_day}
                                            <br />
                                            Kết thúc: <a role='text' style={{ textDecoration: 'none' }} className="text-danger">{data.end_day}</a>
                                        </p>

                                        <Button variant="warning"> <ImHammer2 /> &nbsp;Đấu giá
                                        </Button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button variant="info" onClick={() => setModalShow(true)}> <AiOutlineHistory /> &nbsp;Lịch sử
                                        </Button>
                                        <AutionHistory show={modalShow} onHide={() => setModalShow(false)} />
                                        <br /><br />
                                        <b >Thông tin sản phẩm</b>
                                        {ReactHtmlParser(data.description)}
                                    </div>
                                </div>
                            </Col >
                        </Row>
                        : null
                    }
                </div>
            </div>
            <div className="card mb-3 mt-4 no-gutters" >
                <div className="row no-gutters m-auto p-auto">
                    <Row xs={1} className=" mt-4 m-auto p-auto">
                        <h5 >Sản phẩm cùng mục</h5>
                        {
                            realationProduct ?
                                <Row xs={1} md={realationProduct.length} className="g-4 m-auto mb-3" >
                                    {realationProduct.map((item) => (
                                        <ProductCard key={item.product_id} item={item} />
                                    ))}
                                </Row>
                                : null}
                    </Row>
                </div>
            </div>
        </>
    );
}
