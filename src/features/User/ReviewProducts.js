
import { Tabs, Tab, Col, Row, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Review from '../../components/Review';
import UserNavBar from '../../components/UserNavBar';
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from 'jwt-decode';
import Footer from '../../components/Footer';
import axios from 'axios';
import { NotifyHelper } from '../../helper/NotifyHelper';

export default function ReviewProduct() {
    const [reviews, setReviews] = useState();
    const dispatch = useDispatch();
    const [buyer, setBuyer] = useState(true);
    const userId = jwt_decode(localStorage.x_accessToken).account_id;


    function getReviews() {
        let data = {
        };

        const config = {
            headers: {
                'x-access-token': localStorage.x_accessToken,
                'x-refresh-token': localStorage.x_refreshToken
            }
        }

        axios
            .get(`http://localhost:3002/api/evaluation_historys/${userId}`, data, config)
            .then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    setReviews(res.data);

                }

            })
            .catch(function (error) {
                NotifyHelper.error("Đã có lỗi xảy ra", "Thông báo");
            });
    }

    useEffect(() => {
        getReviews();
        if(localStorage.x_accessToken){
            jwt_decode(localStorage.x_accessToken).role_id === 2 ?  setBuyer(false): setBuyer(true);
        }
    }, []);

    console.log(reviews)
    console.log(userId)
    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={8}>
                    <UserNavBar />
                    <h5 className="d-flex justify-content-center mt-4">Các đánh giá!</h5>
                    {reviews ? reviews.map((item) =>
                        (<Review item={item} key={item.evaluation_id} />)
                    ) : null}
                    <Footer />
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}
