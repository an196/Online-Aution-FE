import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import ReactHtmlParser from "react-html-parser";
import { removeProductfromWatchList } from '../features/User/UserSlice';
import {
    formatDateTime,
    formatProductName,
    formatPrice,
} from '../utils/utils';
import { useDispatch } from 'react-redux';
import { NotifyHelper } from '../helper/NotifyHelper';
import axios from 'axios';


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

export default function ProductCard({ item, watchList }) {
    const defaultImg = '../../public/images.png/100px250';
    const [like, setlike] = useState(false);
    const dispatch = useDispatch();
    const [validUser, setValidUser] = useState(false);

    
    const id = item.product_id;
    const data = {
        ...item,
        name: formatProductName(item.name),
        start_cost: formatPrice(item.start_cost),
        buy_now: formatPrice(item.buy_now),
        created_at: formatDateTime(item.created_at),
        end_day: formatDateTime(item.end_day),
        image: item.image ? item.image : defaultImg
    };

    function handleLike() {
        if(like){
            removeWatchList();
            setlike(false);
            removeProductfromWatchList(id)
        }
        else{
            addWatchList();
            setlike(true);
        }
    }

    useEffect(()=>{
        if (localStorage.x_accessToken) {
            setValidUser(true);
        }
       if(watchList){
        if(watchList.some(item => id === item.product_id))
            setlike(true);
       }
    },[removeProductfromWatchList]);


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
                if (res.status === 200){
                    NotifyHelper.success(res.data.message, "Thông báo")
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
                if (res.status === 200){
                    NotifyHelper.success(res.data.message, "Thông báo")
                    
                }
            })
            .catch(function (error) {
                NotifyHelper.error(error, "Thông báo");
                console.log(error)
            });
    }


    return (
        <Col>{data ?
            <div>
                <Card style={styles.card}>
                    <Card.Img variant="top" src={data.image} style={styles.cardImage} />
                    <Card.Body style={styles.cardBody}>
                        <Card.Title style={styles.cardTitle} className='mt-1'> {data.name} &nbsp;&nbsp;&nbsp;&nbsp;
                        </Card.Title>
                        <Card.Text style={styles.cardText} >
                            Đấu giá: {data.start_cost}
                            <br />
                            Người bán:  {data.seller_name.length > 13 ? data.seller_name :
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
                            {
                                validUser ?
                                    <p role='button' className='d-flex justify-content-center' onClick={handleLike}>
                                        {like ? <AiFillHeart style={{ color: 'red' }} /> : <AiOutlineHeart />}
                                    </p>
                                :null
                            }

                        </Row>
                    </Card.Body>
                </Card>
            </div>
            : null}
        </Col>

    )
}