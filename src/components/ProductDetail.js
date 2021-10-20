
import { useState, useEffect } from 'react';
import { Image, Row, Col, Button } from 'react-bootstrap';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineHistory } from "react-icons/ai";
import { ImHammer2 } from "react-icons/im";
import AutionHistory from '../components/AutionHistory';
import ProductCard from './ProductCard';
import ReactHtmlParser from "react-html-parser";
import { formatDateTime, formatProductName } from '../utils/utils';
import { selectWatchList, getWatchList, addWatchList, removeWatchList } from '../features/User/UserSlice';
import {
    selectInfoProduct,
    getInfoProduct,
    selectRelationProduct,
} from '../features/product/productSlice';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { NotifyHelper } from '../helper/NotifyHelper';


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
    const [modalShow, setModalShow] = useState(false);
    const [watchList,setWatchList] = useState();
    const [validUser, setValidUser] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    const query = new URLSearchParams(useLocation().search);
    const id = query.get("productid");
    const [like, setlike] = useState();

    function handleLike(e) {

        //
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
                console.log(res.data.watch_list);
                if (res.status === 200) {
                    setWatchList(res.data.watch_list);
                    console.log(res.data.watch_list);
                }

            })
            .catch(function (error) {
                NotifyHelper.error("Đã có lỗi xảy ra", "Thông báo");
            });
    }

    const data = {
        ...infoProduct,
        start_day: formatDateTime(infoProduct.created_at),
        buy_now: formatDateTime(infoProduct.buy_now),
        end_day: formatDateTime(infoProduct.end_day),
    }

    useEffect(() => {
        query.get("like") === 'true' ? setlike(true) : setlike(false);

        dispatch(getInfoProduct(id));
        if (localStorage.x_accessToken) {
            setValidUser(true);
            getWatchList();
        }

    }, [dispatch,location]);

    console.log(like)
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
            <h5 >Sản phẩm cùng mục</h5>
            <div className="card mb-3 mt-4 no-gutters" >
                <div className="row no-gutters m-auto p-auto">

                    <Row xs={1} className=" mt-4 m-auto p-auto">
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
