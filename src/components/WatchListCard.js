import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import ReactHtmlParser from "react-html-parser";

import {
    formatDateTime,
    formatProductName,
    formatPrice,
} from '../utils/utils';

const styles = {
    card: {
        //backgroundColor: '#B7E0F2',
        borderRadius: 5,
        width: '8.8rem'
    },
    cardImage: {
        objectFit: 'cover',
        width: '8.6rem',
        height: '8.6rem',
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

export default function WatchListCard({ item }) {
    const defaultImg = '../../public/images.png/100px250';

    const data = {
        ...item,
        product_name: formatProductName(item.product_name),
        start_cost: formatPrice(item.start_cost),
        start_day: formatDateTime(item.start_day),
        end_day: formatDateTime(item.end_day),
        image: item.image ? item.image : defaultImg
    };

    return (
        <Col>{data ?
            <div>
                <Card style={styles.card} >
                    <Card.Img variant="top" style={styles.cardImage} src={data.product_image} />
                    <Card.Body style={styles.cardBody}>
                        <Card.Title style={styles.cardTitle}> {data.product_name}</Card.Title>
                        <Card.Text style={styles.cardText} >
                            Mã SP: {data.product_id}
                            <br />
                            Khời điểm: {data.start_cost}
                            <br />
                            Người bán: {data.seller_name}
                            <br />
                            Danh mục: {data.category_name}
                            <br />
                            Ngày bắt đầu: {data.start_day}
                            <br />
                            <a role='text' style={{ textDecoration: 'none' }} className="text-danger">Hạn: {data.end_day}</a>
                            <br />
                            <Link to="/product/detail" style={{ fontSize: '0.6rem' }}>Xem chi tiết</Link>
                        </Card.Text>
                        <Row className="d-flex justify-content-center">
                            <AiOutlineHeart />
                        </Row>
                    </Card.Body>
                </Card>
            </div>
            : null}
        </Col>

    )
}