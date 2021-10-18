
import { Tabs, Tab, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Review from '../../components/Review';
import UserNavBar from '../../components/UserNavBar';
import { useSelector, useDispatch } from "react-redux";
import { selectReviews, getReviews } from './UserSlice';
import jwt_decode from 'jwt-decode';
import Footer from '../../components/Footer';

export default function ReviewProduct() {
    const data = useSelector(selectReviews);
    const dispatch = useDispatch();
    const [buyer, setBuyer] = useState(true);
    const userId = jwt_decode(localStorage.x_accessToken).account_id;

    useEffect(() => {
        dispatch(getReviews(userId));
    }, [dispatch])

    console.log(data)
    return (
        <Row>
            <Col></Col>
            <Col xs={8}>
                <UserNavBar />
                <h5 className="d-flex justify-content-center mt-4">Các đánh giá!</h5>
                {data.map((item) => 
                   ( <Review item={item} key={item.evaluation_id} />)
                )}
                <Footer/>
            </Col>
            <Col></Col>
        </Row>
    );
}
