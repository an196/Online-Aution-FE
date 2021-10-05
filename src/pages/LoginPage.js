import React, { Col, Form, Row, Button } from "react-bootstrap";
import { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../features/User/UserSlice";

export default function Login() {
    const [validated, setValidated] = useState(false);
    const history = useHistory();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            
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
                    console.log(user)
                    if(user){
                        switch(user.role_id){
                            case 1:
                            case 2:
                                history.push("/user/favorite");
                                break;
                            case 3:
                                history.push("/admin")
                                break;
                            default:
                                break;
                        }
                    }
                    
                    
                })
                .catch(function (error) {
                    console.log(error);
                    alert('Sai mật khẩu hoặc cú pháp')
                });
        }
    }

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
                    <Row >
                        <Form.Group className='d-flex justify-content-center'>
                            <Button type="submit" >Đăng nhập</Button>
                        </Form.Group>

                    </Row>

                </Form>
            </div>
        </div>
    );

}