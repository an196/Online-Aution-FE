
import { useState, useEffect, useRef } from 'react';
import { Image, Row, Col, Button, Modal, Form, FormControl } from 'react-bootstrap';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineHistory } from "react-icons/ai";
import { ImHammer2 } from "react-icons/im";
import AutionHistory from './AuctioningTable';
import ProductCard from './ProductCard';
import ReactHtmlParser from "react-html-parser";
import { formatDateTime, formatProductName, formatPrice, formatEndDay } from '../utils/utils';
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
import AuctioningTable from './AuctioningTable';
import AuctionHistoryDetail from './AuctionHistoryDetail';

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
    const dispatch = useDispatch();
    const location = useLocation();

    const [watchList, setWatchList] = useState();
    const [validUser, setValidUser] = useState(false);
    const [winner, setWinner] = useState();
    const [evaluated, setEvaluated] = useState();

    //ower
    const [owner, setOwner] = useState();

    //evaluation
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [auctionId, setAuctionId] = useState();
    const [accountId, setAccountId] = useState();

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


    //call api --------------------------------------------------------------------------------------->
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

    function getEvaluationBidder(id) {
        const config = {
            headers: {
                'x-access-token': localStorage.x_accessToken,
                'x-refresh-token': localStorage.x_refreshToken
            }
        }

        axios
            .get(`http://localhost:3002/api/bidder/product/evaluation?seller_id=${id}`, config)
            .then(function (res) {
                console.log(res)
                if (res.status === 200) {
                    if (res.data.description) {
                        setEvaluated(true);
                    } else {
                        setEvaluated(false);
                    }

                }

            })
            .catch(function (error) {
                NotifyHelper.error("Đã có lỗi xảy ra", "Thông báo");
            });
    }

    const handleSubmit = function () {

        let data = {
            account_id: accountId,
            auction_id: auctionId,
            description: message,
            score: 1
        };

        const config = {
            headers: {
                'x-access-token': localStorage.x_accessToken,
                'x-refresh-token': localStorage.x_refreshToken
            }
        }

        axios
            .post("http://localhost:3002/api/evaluation_historys", data, config)
            .then(function (res) {
                if (res.status === 200) {
                    NotifyHelper.success(res.data.message, "Thông báo");
                    setEvaluated(true)
                }

            })
            .catch(function (error) {
                NotifyHelper.error("Đã có lỗi xảy ra", "Thông báo");
                setEvaluated(true)
            });
        setShow(false)

    };

    //hanlde 
    const data = {
        ...infoProduct,
        created_at: formatDateTime(infoProduct.created_at),
        start_day: formatDateTime(infoProduct.start_day),
        buy_now: formatPrice(infoProduct.buy_now),
        start_cost: formatPrice(infoProduct.start_cost),
        end_day: formatEndDay(infoProduct.end_day),
    }

    function handleAution() {
        if (socketRef.current.connected) {
            // thông tin đấu giá gửi lên server
            const auctionCost = infoProduct.current_cost ? infoProduct.current_cost : infoProduct.start_cost;
            socketRef.current.emit("dau_gia_san_pham", { product_id: Number(id), cost: auctionCost });

        } else {
            // console.log("không thể kết nối đến server");
            NotifyHelper.error("Có lỗi đã xảy ra", 'Thông báo');
        }
    }

    function handleBuynow() {
        if (socketRef.current.connected) {
            // thông tin đấu giá gửi lên server
            socketRef.current.emit("mua_ngay", { product_id: Number(id), cost: infoProduct.buy_now });
        } else {
            // console.log("không thể kết nối đến server");
            NotifyHelper.error("Có lỗi đã xảy ra", 'Thông báo');
        }
    }

    function handleChaneMessage(e) {
        setMessage(e.target.value);
    }

    useEffect(() => {
        dispatch(getInfoProduct(id));

        if (localStorage.x_accessToken) {
            setValidUser(true);
            getWatchList();


            jwt_decode(localStorage.x_accessToken).account_id === data.seller_id ? setOwner(true) : setOwner(false);
            jwt_decode(localStorage.x_accessToken).account_id === data.bidder_id ? setWinner(true) : setWinner(false);
            if (data.compare_day < 0) {
                getEvaluationBidder(data.bidder_id);

            }
        }

    }, [dispatch, winner, location]);

    useEffect(() => {
    }, [getEvaluationBidder,setEvaluated,autionHistoryList,winner,dispatch,infoProduct]);



    useEffect(() => {
        if (localStorage.x_accessToken) {
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
                if (localStorage.x_accessToken && res.account_id === jwt_decode(localStorage.x_accessToken).account_id) {
                    if (res.status === 200) {
                        NotifyHelper.success(res.message, 'Thông báo')

                    }
                    else {
                        NotifyHelper.error(res.message, 'Thông báo')

                    }
                }


            });

            socketRef.current.on("cap_nhat_giao_dien_xem_chi_tiet_san_pham_nguoi_ban", (res) => {
                if (localStorage.x_accessToken && res.account_id === jwt_decode(localStorage.x_accessToken).account_id) {
                    setAutionHistoryList(res.info_auction_detail)
                }
            });

            return () => {
                socketRef.current.disconnect();
            };
        }

    }, []);

    //console.log(data)


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
                                                (data.buy_now ?
                                                    <>
                                                        <Button className='m-2 ' onClick={handleBuynow} variant="success"> <AiOutlineShoppingCart></AiOutlineShoppingCart>&nbsp; Mua ngay
                                                        </Button> {data.buy_now}
                                                    </>
                                                    : null)

                                                : null}
                                            <br />
                                            Người bán: {data.seller_name} &nbsp;&nbsp;&nbsp;&nbsp;  Đánh giá: {data.evaluation_score} điểm
                                            <br />
                                            Đăng: {data.created_at}
                                            <br />
                                            Bắtđầu: {data.start_day}
                                            <br />
                                            {/* Kết thúc: <a role='text' style={{ textDecoration: 'none' }} className="text-danger">{data.end_day}</a> */}
                                            {ReactHtmlParser(data.end_day)}
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
                        data.compare_day < 0 ?

                            <Row className='m-auto'>
                                {owner ?
                                    <Row className='m-3'>
                                        <h6>Thông tin người chiến thắng:</h6>
                                        <span>Id: {data.bidder_id}</span>
                                        <span>Tên: {data.bidder_name}</span>
                                        {
                                            !evaluated ?
                                                <Button className="col-md-2 m-3" size="sm"
                                                    onClick={() => {
                                                        setShow(true);
                                                        setAccountId(data.bidder_id);
                                                        setAuctionId(data.auction_id)
                                                    }}
                                                    variant="primary">
                                                    Đánh giá
                                                </Button>
                                                : null
                                        }

                                    </Row>
                                    : null
                                }
                                {
                                    winner ?
                                        <Row className='m-3'>
                                            <h6>Thông tin người chiến thắng:</h6>
                                            <span>Id: {data.bidder_id}</span>
                                            <span>Tên: {data.bidder_name}</span>
                                            {
                                                evaluated ?
                                                    <Button className="col-md-2 m-3" size="sm"
                                                        onClick={() => {
                                                            setShow(true);
                                                            setAccountId(jwt_decode(localStorage.x_accessToken).account_id);
                                                            setAuctionId(data.auction_id)
                                                        }}
                                                        variant="primary">
                                                        Đánh giá
                                                    </Button>
                                                    : null
                                            }
                                        </Row>
                                        : null
                                }
                                <Col md='12'>
                                    <AuctionHistoryDetail />
                                </Col>
                            </Row>
                            : null
                    }
                    {
                        owner && data.compare_day > 0 ?
                            <Row className='m-auto'>
                                <Col>
                                    <AuctioningTable />
                                </Col>
                            </Row>

                            : null
                    }
                    {/* <Row className='m-auto'>
                        <Row className='m-3'>
                            <h6>Thông tin người chiến thắng:</h6>
                            <span>Id: {data.bidder_id}</span>
                            <span>Tên: {data.bidder_name}</span>
                            <Button className="col-md-2 m-3" size="sm"
                                onClick={() => { setShow(true); }}
                                variant="primary">
                                Đánh giá
                            </Button>
                        </Row>
                        <Col md='12'>
                            <AuctionHistoryDetail />
                        </Col>
                    </Row> */}
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin đánh giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex justify-content-around" >
                        <FormControl
                            type="text"
                            className="mr-2"
                            aria-label="Search"
                            name='message'
                            onChange={handleChaneMessage}
                        />
                        <div style={{ width: 10 }}></div>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" type='submit' onClick={handleSubmit}>
                        Gửi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


