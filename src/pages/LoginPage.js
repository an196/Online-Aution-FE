import React, { Col, Form, Row, Button } from "react-bootstrap";
import { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../features/User/UserSlice";
import { Link } from "react-router-dom";
import { NotifyHelper } from "../helper/NotifyHelper";

export default function Login() {
    const [validated, setValidated] = useState(false);
    const history = useHistory();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity()) {


            const email = event.target.email.value;
            const pwd = event.target.password.value;
            getUsers({ email, pwd });
        }
        setValidated(true);

    };


    function getUsers(data) {
        // With error handling

        if (data) {
            const body = {
                email: data.email,
                pass_word: data.pwd
            };

            axios
                .post("http://localhost:3002/api/accounts/signin", body)
                .then(function (res) {
                    if (res.status === 200)
                        if (res.data.authenticated === true) {

                            const { accessToken, refreshToken } = res.data;
                            localStorage.setItem('x_accessToken', accessToken);
                            localStorage.setItem('x_refreshToken', refreshToken);

                            const user = jwt_decode(accessToken);
                            dispatch(setUser(user));
                        }

                })
                .then(function (res) {

                    if (user) {
                        switch (user.role_id) {
                            case 1:
                            case 2:
                                history.push("/user/favorite");
                                NotifyHelper.success("Đăng nhập thành công", "Thông báo");
                                break;
                            case 3:
                                history.push("/admin")
                                NotifyHelper.success("Đăng nhập thành công", "Thông báo");
                                break;
                            default:
                                break;
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    NotifyHelper.error("Đăng nhập thất bại", "Thông báo");
                });
        }
    }

    const info = () => {
        NotifyHelper.success("Đăng ký thành công", "Thông báo");
      };
    return (

        <div className='container col-md-5'>
            <div className='card  mt-5 p-4'  >
                <h3 className='d-flex justify-content-center'>Đăng nhập</h3>
                <Form className='p-2' noValidate validated={validated} onSubmit={handleSubmit} >
                    <Row className="">
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label column="sm">Email</Form.Label>
                            <Form.Control size="sm"
                                required
                                type="text"
                                placeholder="Email"
                                defaultValue=""
                                name="email"
                            />
                            <Form.Control.Feedback>Tốt!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label column="sm">Mật khẩu</Form.Label>
                            <Form.Control
                                required
                                placeholder="Mật khẩu"
                                defaultValue=""
                                type="password"
                                name="password"
                            />
                            <Form.Control.Feedback>Tốt!</Form.Control.Feedback>
                        </Form.Group>
                    </Row >

                    {/* <Recaptcha
                        sitekey="xxxxxxxxxxxxxxxxxxxx"
                        render="explicit"
                        // verifyCallback={verifyCallback}
                        onloadCallback={callback}
                    />, */}
                    <Row className='mb-2 h-1' >
                        <Form.Group >
                            <Button type="submit" className='col-md-12'>Đăng nhập</Button>
                        </Form.Group>

                    </Row>
                    <Row >
                        <Form.Group >
                            <Link to='/sigup'> <Button type="submit" className='col-md-12'>Đăng ký</Button></Link>
                        </Form.Group>
                    </Row>
                    <Link to='/' style={{fontSize:'0.72rem', textDecoration: 'underline'}}>Quay về trang chủ</Link>
                </Form>
            </div>
        </div>
    );

}