import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import ReactHtmlParser from "react-html-parser";

import { 
    formatDateTime, 
    formatProductName,
    formatUserName 
} from '../utils/utils';

const styles = {
    card: {
        //backgroundColor: '#B7E0F2',
        borderRadius: 5,
        width: '8.8rem'
    },
    cardImage: {
        objectFit: 'cover',
        width: '8.8rem',
        height: '8.8rem',
    },
    cardTitle: {
        fontSize: '0.8rem'
    },
    cardBody: {
        width: '8.8rem'
    },
    cardText: {
        fontSize: '0.6rem'
    },
}

export default function ProductCard({ item }) {
    const defaultImg = '../../public/images.png/100px250';

    const data = {
        ...item,
        name: formatProductName(item.name),
        created_at: formatDateTime(item.created_at),
        buy_now: formatDateTime(item.buy_now),
        end_day: formatDateTime(item.end_day),
        image: item.image ? item.image : defaultImg
    };

    return (
        <Col>{data ?
            <div>
                <Card style={styles.card}>
                    <Card.Img variant="top" src={data.image} style={styles.cardImage} />
                    <Card.Body style={styles.cardBody}>
                        <Card.Title style={styles.cardTitle} className='mt-1'> {data.name} &nbsp;&nbsp;&nbsp;&nbsp;
                        </Card.Title>
                        <Card.Text style={styles.cardText} >
                            Đấu giá: {data.start_cost}₫
                            <br />
                            Người bán:  {data.seller_name.length >13 ? data.seller_name : 
                            <>
                            {data.seller_name} 
                            {ReactHtmlParser('&nbsp;')}
                            </>
                            }
                            <br />
                            Mua Ngay: {data.buy_now}
                            <br />
                            Ngày đăng: {data.created_at}
                            <br />
                            <a role='text' style={{ textDecoration: 'none' }} className="text-danger">Hạn: {data.end_day}</a>
                            <br />
                            Lượt đấu giá: {data.count_auction}
                            <br />
                            <Link to={`/product/detail/${data.product_id}`} style={{ fontSize: '0.6rem' }}>Xem chi tiết</Link>
                        </Card.Text>
                        <Row className="d-flex justify-content-center">
                            <AiOutlineHeart />
                        </Row>
                    </Card.Body>
                </Card>
                <Col className='col-md-1'></Col>
            </div>
            : null}
        </Col>

    )
}