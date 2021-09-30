import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ProductCard from './ProductCard';

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


export default function Home(props) {
    return (
        <div className="container mt-4" >
            <Row xs={1}>
                <h5>Sản phẩm gần kết thúc</h5>
                <Row xs={1} md={5} className="g-4" >
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <ProductCard key={idx}/>
                    ))}
                </Row>
            </Row>
            <Row xs={1} className="mt-5">
                <h5>Sản phẩm đấu giá nhiều nhất</h5>
                <Row xs={1} md={5} className="g-4" >
                    {Array.from({ length: 5 }).map((_, idx) => (
                       <ProductCard key={idx}/>
                    ))}
                </Row>
            </Row>
            <Row xs={1} className="mt-5">
                <h5>Sản phẩm có giá cao nhất</h5>
                <Row xs={1} md={5} className="g-4" >
                    {Array.from({ length: 5 }).map((_, idx) => (
                       <ProductCard key={idx}/>
                    ))}
                </Row>
            </Row>
        </div>
    );
};
