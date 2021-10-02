import { useState } from 'react';
import {  Col,Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

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
        fontSize: '0.8rem'
    },
    cardBody: {
        width: '8.8rem'
    },
    cardText: {
        fontSize: '0.6rem'
    },
}

export default function ProductCard({ item}) {
    
    const data = {...item,
        created_at: item.created_at? dateFormat( item.created_at, "dd/mm/yyyy hh:mm:ss"): "Không có",
        buy_now: item.buy_now? dateFormat(item.buy_now, "dd/mm/yyyy hh:mm:ss") : "Không có",
        end_day: item.end_day?dateFormat( item.end_day, "dd/mm/yyyy hh:mm:ss"): "Không có",
    };
    
    return (
        <Col>{data?
            <Card style={styles.card}>
                <Card.Img variant="top" src={data.image} />
                <Card.Body style={styles.cardBody}>
                    <Card.Title style={styles.cardTitle} className='mt-1'> {data.name} &nbsp;&nbsp;&nbsp;&nbsp; 
                    </Card.Title>
                    <Card.Text style={styles.cardText} >
                        Đấu giá: {data.start_cost}₫
                        <br />
                        Người bán:  {data.seller_name}
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
                        <AiOutlineHeart  />
                    </Row>
                </Card.Body>

            </Card>
            : null}
        </Col>
        
    )
}