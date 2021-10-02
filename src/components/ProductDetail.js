
import { Image, Row, Col, Button } from 'react-bootstrap';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineHistory } from "react-icons/ai";
import { ImHammer2 } from "react-icons/im";
import { useState, useEffect } from 'react';
import AutionHistory from '../components/AutionHistory';
import ProductCard from './ProductCard';
import ReactHtmlParser from "react-html-parser";
import dateFormat from 'dateformat';

import {
    selectInfoProduct,
    getInfoProduct,
    selectRelationProduct,
} from '../features/product/productSlice';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';

const styles = {
    card: {
        //backgroundColor: '#B7E0F2',
        borderRadius: 5,
        width: '8.8rem'
    },
    cardImage: {
        objectFit: 'cover',
        borderRadius: 55,
        with: '8.8rem',
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

export default function ProductDetail(props) {
    const infoProduct = useSelector(selectInfoProduct);
    const realationProduct = useSelector(selectRelationProduct);
    const { id } = useParams();
    const [like, setlike] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    function handleLike(e) {
        setlike(!like);
    }

    const dispath = useDispatch();

    useEffect(() => {
        dispath(getInfoProduct(id));
       
    }, [dispath]);

    const data = {
        ...infoProduct,
        start_day: infoProduct.created_at ? dateFormat(infoProduct.created_at, "dd/mm/yyyy hh:mm:ss") : "Không có",
        buy_now: infoProduct.buy_now ? dateFormat(infoProduct.buy_now, "dd/mm/yyyy hh:mm:ss") : "Không có",
        end_day: infoProduct.end_day ? dateFormat(infoProduct.end_day, "dd/mm/yyyy hh:mm:ss") : "Không có",
    }

    return (
        <>
            <div className="card mb-3 mt-4 no-gutters" >
                <div className="row no-gutters">
                    {data ?
                        <Row >
                            <Col className="col-md-4 m-2">
                                <Row>
                                    <title>Placeholder</title>

                                    <Image src={data.image ? data.image[0] : ''} fluid />
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
                                    <p role='button' className='d-flex justify-content-center' onClick={handleLike}>
                                        {like ? <AiFillHeart style={{ color: 'red' }} /> : <AiOutlineHeart />}
                                    </p>
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
                            <Row xs={1} md={realationProduct.length } className="g-4 m-auto mb-3" >
                            {realationProduct.map((item) => (
                                <ProductCard key={item.product_id} item={item} />
                            )) }
                        </Row>
                        :null}
                    </Row>
                </div>
            </div>
        </>
    );
}
