import { Tabs, Tab, Col, Row,Container } from 'react-bootstrap';
import ProductAutioning from '../../components/ProductAutioning';
import ProductShefing from '../../components/ProductShefing';
import UserNavBar from '../../components/UserNavBar';
import { useSelector, useDispatch } from "react-redux";
import { selectUser, getUserInfo } from './UserSlice';
import { useState, useEffect } from 'react';

export default function AutionProducts() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [buyer, setBuyer] = useState(true);

    useEffect(() => {
        dispatch(getUserInfo());
        if (user && user.role_id == 2) {
            setBuyer(false);
        }

    }, [dispatch])

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={8}>
                    <UserNavBar />
                    <Tabs defaultActiveKey="buyer" id="uncontrolled-tab-example" className="">
                        <Tab eventKey="buyer" title="Mua">
                            <h5 className="d-flex justify-content-center mt-4">Sản phẩm đang bạn đang đấu giá !</h5>
                            <ProductAutioning />
                        </Tab>
                        <Tab eventKey="seller" title="Bán" disabled={buyer}>
                            <h5 className="d-flex justify-content-center mt-4">Sản phẩm đang bán của bạn!</h5>
                            <ProductShefing />
                        </Tab>
                    </Tabs>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}