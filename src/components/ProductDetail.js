
import { useState, useEffect, useRef } from 'react';
import { Image, Row, Col, Button } from 'react-bootstrap';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineHistory } from "react-icons/ai";
import { ImHammer2 } from "react-icons/im";
import AutionHistory from '../components/AutionHistory';
import ProductCard from './ProductCard';
import ReactHtmlParser from "react-html-parser";
import { formatDateTime, formatProductName, formatPrice } from '../utils/utils';
import { addWatchList, removeWatchList } from '../features/User/UserSlice';
import {
    selectInfoProduct,
    getInfoProduct,
    selectRelationProduct,
} from '../features/product/productSlice';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { NotifyHelper } from '../helper/NotifyHelper';
import socketIOClient from "socket.io-client";
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

export default function ProductDetail() {
    const infoProduct = useSelector(selectInfoProduct);
    const realationProduct = useSelector(selectRelationProduct);

    const [watchList, setWatchList] = useState();
    const [validUser, setValidUser] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    //ower
    const [owner, setOwner] = useState();


    //get id
    const query = new URLSearchParams(useLocation().search);
    const id = query.get("productid");
    const [like, setlike] = useState();

    // aution history list
    const [autionHistoryList, setAutionHistoryList] = useState();

    //socket
    const host = "http://localhost:3002";
    const [connect, setConnect] = useState(true);
    const socketRef = useRef();
    const querySocket = {
        query: {
            token: localStorage.x_accessToken ? localStorage.x_accessToken : null
        }
    }

    function handleLike(e) {

        if (like) {
            dispatch(removeWatchList(id));
            setlike(false);

        }
        else {

            dispatch(addWatchList(Number(id)));
            setlike(true);

        }
    }

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
                if (res.status === 200) {
                    setWatchList(res.data.watch_list);
                    if (res.data.watch_list.some(item => Number(id) === item.product_id))
                        setlike(true);
                }

            })
            .catch(function (error) {
                NotifyHelper.error("Đã có lỗi xảy ra", "Thông báo");
            });
    }

    const data = {
        ...infoProduct,
        start_day: formatDateTime(infoProduct.created_at),
        buy_now: formatPrice(infoProduct.buy_now),
        start_cost: formatPrice(infoProduct.start_cost),
        end_day: formatDateTime(infoProduct.end_day),
    }

    function handleAution() {
        if (socketRef.current.connected) {
            // thông tin đấu giá gửi lên server
            socketRef.current.emit("dau_gia_san_pham", { product_id: Number(id), cost: 15000000 });

        } else {
            console.log("không thể kết nối đến server");
            NotifyHelper.error("Có lỗi đã xảy ra", 'Thông báo');
        }
    }

    function handleBuynow() {
        if (socketRef.current.connected) {
            // thông tin đấu giá gửi lên server
            socketRef.current.emit("mua_ngay", { product_id: 1, cost: 3000000 });
        } else {
            console.log("không thể kết nối đến server");
            NotifyHelper.error("Có lỗi đã xảy ra", 'Thông báo');
        }
    }

    useEffect(() => {
        dispatch(getInfoProduct(id));

        if (localStorage.x_accessToken) {
            setValidUser(true);
            getWatchList();

            jwt_decode(localStorage.x_accessToken).account_id === data.seller_id ? setOwner(true) : setOwner(false);
        }

    }, [dispatch, location, NotifyHelper]);

    useEffect(() => {
        socketRef.current = socketIOClient.connect('http://localhost:3002', {
            query: {
                token: localStorage.x_accessToken ? localStorage.x_accessToken : null
            }
        });

        socketRef.current.on("ket_qua_dau_gia_nguoi_mua", (res) => {
            if (localStorage.x_accessToken && res.account_id === jwt_decode(localStorage.x_accessToken).account_id) {
                if (res.status === 200) {

                    NotifyHelper.success(res.message, 'Thông báo')
                }
                else {
                    NotifyHelper.error(res.message, 'Thông báo')

                }
            }
        });

        socketRef.current.on("ket_qua_dau_gia_nguoi_mua_ngay", (res) => {

            if (res.status === 200) {
                NotifyHelper.success(res.message, 'Thông báo')

            }
            else {
                NotifyHelper.error(res.message, 'Thông báo')

            }

        });

        socketRef.current.on("cap_nhat_giao_dien_xem_chi_tiet_san_pham_nguoi_ban", (res) => {

            setAutionHistoryList(res.info_auction_detail)

        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    console.log(data)
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
                                            Giá hiện tại: {data.start_cost} <br />
                                            {validUser ?
                                                ( data.buy_now ?
                                                    <>
                                                    <Button className='m-2 ' onClick={handleBuynow} variant="success"> <AiOutlineShoppingCart></AiOutlineShoppingCart>&nbsp; Mua ngay
                                                    </Button> {data.buy_now}
                                                </>
                                                :null)
                                               
                                                : null}
                                            <br />
                                            Người bán: {data.seller_name} &nbsp;&nbsp;&nbsp;&nbsp;  Đánh giá: {data.evaluation_score} điểm
                                            <br />
                                            Đăng: {data.start_day}
                                            <br />
                                            Kết thúc: <a role='text' style={{ textDecoration: 'none' }} className="text-danger">{data.end_day}</a>
                                        </p>
                                        {validUser ?
                                            <>
                                                <Button className='mb-2' onClick={handleAution} variant="warning"> <ImHammer2 /> &nbsp;Đấu giá
                                                </Button>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                {/* <Button className='mb-2' variant="info" onClick={() => setModalShow(true)}> <AiOutlineHistory /> &nbsp;Lịch sử
                                                </Button> */}

                                            </>
                                            : null}
                                        <br /><br />
                                        <b >Thông tin sản phẩm</b>
                                        {ReactHtmlParser(data.description)}
                                    </div>
                                </div>
                            </Col >
                        </Row>
                        : null
                    }
                    {
                        owner ?
                            <Row className='m-auto'>
                                <Col md='12'>
                                    <AutionHistory />
                                </Col>
                            </Row>
                            : null
                    }

                </div>

            </div>
            <h5 >Sản phẩm cùng mục</h5>
            <div className="card mb-3 mt-4 no-gutters" >
                <Row className="no-gutters">
                    {
                        realationProduct ?
                            <Row xs={1} md={5} className="g-4 m-auto mb-3">
                                {realationProduct.map((item) => (
                                    <ProductCard key={item.product_id} item={item} />
                                ))}
                            </Row>
                            : null}
                </Row>
            </div>
        </>
    );
}


