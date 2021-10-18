import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { AiOutlineHeart,AiFillHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import ReactHtmlParser from "react-html-parser";
import axios from 'axios';
import {
    formatDateTime,
    formatProductName,
    formatPrice,
} from '../utils/utils';
import { NotifyHelper } from '../helper/NotifyHelper';
import { useEffect } from 'react';

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

export default function WatchListCard({ item, watchList }) {
    const defaultImg = '../../public/images.png/100px250';
    const [like, setlike] = useState(true);
    const id = item.product_id;

    const data = {
        ...item,
        product_name: formatProductName(item.product_name),
        start_cost: formatPrice(item.start_cost),
        start_day: formatDateTime(item.start_day),
        end_day: formatDateTime(item.end_day),
        image: item.image ? item.image : defaultImg
    };

    function handleLike() {
        if(like){
            removeWatchList();
            setlike(false);
            console.log(id)
        }
        else{
            addWatchList();
            setlike(true);
        }
    }

    function addWatchList(){
        const data = {
            product_id: id
        };

        let headers = {};
        headers['x-access-token'] = localStorage.x_accessToken ? localStorage.x_accessToken : null;
        headers['x-refresh-token'] = localStorage.x_refreshToken ? localStorage.x_refreshToken : null;

        let config = {
            headers: { ...headers}
        }
       
        axios
            .post(`http://localhost:3002/api/bidder/watch_list?product_id=${id}`,data, config)
            .then(function (res) {
                console.log(res)
                if (res.status === 200){
                    NotifyHelper.success(res.data.message, "Thông báo")
                    //dispatch(remove(id))
                }
                    

            })
            .catch(function (error) {
                NotifyHelper.error(error, "Thông báo");
                console.log(error)
            });
    }

    function removeWatchList(){
        
        let headers = {};
        headers['x-access-token'] = localStorage.x_accessToken ? localStorage.x_accessToken : null;
        headers['x-refresh-token'] = localStorage.x_refreshToken ? localStorage.x_refreshToken : null;

        let config = {
            headers: { ...headers}
        }
       
        axios
            .delete(`http://localhost:3002/api/bidder/watch_list?product_id=${id}`, config)
            .then(function (res) {
                console.log(res)
                if (res.status === 200){
                    NotifyHelper.success(res.data.message, "Thông báo")
                    //dispatch(remove(id))
                }
                    

            })
            .catch(function (error) {
                NotifyHelper.error(error, "Thông báo");
                console.log(error)
            });
    }


    useEffect(() => {

        if (watchList) {
            if (watchList.some(item => id === item.product_id))
                setlike(true);
        }
    });

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
                            <p role='button' className='d-flex justify-content-center' onClick={handleLike}>
                                {like ? <AiFillHeart style={{ color: 'red' }} /> : <AiOutlineHeart />}
                            </p>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
            : null}
        </Col>

    )
}