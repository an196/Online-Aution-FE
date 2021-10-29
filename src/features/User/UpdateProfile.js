import React from 'react';
import { Col, Row, Form, Button, InputGroup, Container } from 'react-bootstrap';
import UserNavBar from '../../components/UserNavBar';
import { useEffect, useState, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { FaSave } from 'react-icons/fa';

export default function UpdateProfile() {
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleSubmit() {

    }
    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={8}>
                    <UserNavBar />
                    <h5 className="d-flex justify-content-center mt-4">Cập nhật tài khoản!</h5>
                    <Row className='no-gutters'>
                        <Col className="card mb-3 m-4 p-4 no-gutters" md={5}>
                            <h6 className="d-flex justify-content-center mt-4">Cập nhật thông tin cá nhân!</h6>
                            <Form noValidate onSubmit={handleSubmit} validated={validated} method="post" >
                                <Row className="mb-3">
                                    <Form.Group controlId="validationFormik01">
                                        <Form.Label>Tên người dùng</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="fullName"
                                            //onChange={handleChange}
                                            maxLength='255'
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>

                                </Row>
                                <Button type="submit" size="sm">Cập nhật</Button>
                            </Form>
                            <Form noValidate onSubmit={handleSubmit} validated={validated} method="post" >
                                <Row className="mb-3">
                                    <Form.Group controlId="validationFormik01">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            required
                                            type="email"
                                            name="fullName"
                                            //onChange={handleChange}
                                            maxLength='255'
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>

                                </Row>
                                <Button type="submit" size="sm">Cập nhật</Button>
                            </Form>
                        </Col>
                        <Col></Col>
                        <Col className="card mb-3 m-4 p-4 no-gutters" md={5}>
                            <h6 className="d-flex justify-content-center mt-4">Đổi mật khẩu!</h6>
                            <Form noValidate onSubmit={handleSubmit} validated={validated} method="post" >
                                <Row className="mb-3">
                                    <Form.Group controlId="validationFormik01">
                                        <Form.Label>Nhập mật khẩu cũ</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            name="fullName"
                                            //onChange={handleChange}
                                            maxLength='255'
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group controlId="validationFormik01">
                                        <Form.Label>Nhập mật khẩu mới</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            name="fullName"
                                            //onChange={handleChange}
                                            maxLength='255'
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>

                                </Row>
                                <Button  className="d-flex justify-content-center mt-4" type="submit" size="sm" >Cập nhật</Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}
