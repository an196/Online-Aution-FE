import React,{ Button, Col, Form,  Row } from 'react-bootstrap';
import { useState } from 'react';
import {  useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { NotifyHelper } from "../helper/NotifyHelper";

export default function SignupPage(){
    const [validated, setValidated] = useState(false);
    const history = useHistory();
    
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity()) {
            if(event.target.password.value === event.target.repassword.value){
                
                
                
                const email = event.target.email.value;
                const pwd = event.target.password.value;
                const address = event.target.address.value;
                const full_name = event.target.fullname.value;
               
                getUsers({ email, pwd,address, full_name });
            }
            else{
                NotifyHelper.error("Mật khẩu nhập lại không trùng khớp", "Thông báo");
            }
            
        }
        setValidated(true);

    };


    function getUsers(data) {
        // With error handling

        if (data) {
            const body = {
                email: data.email,
                pass_word: data.pwd,
                address: data.address,
                full_name: data.full_name
            };
            console.log(body);
            axios
                .post("http://localhost:3002/api/accounts", body)
                .then(function (res) {
                    if (res.status === 200)
                        console.log(res.data.message);
                        NotifyHelper.success(res.data.message, "Thông báo");
                })
                .catch(function (error) {
                    console.log(error);
                    NotifyHelper.error("Đăng ký thất bại! Tài khoản đã có người sử dụng", "Thông báo");
                });
        }
    }

    return (
        <div className='container col-md-5'>
            <div className='card  mt-5 p-4'  >
                <h3 className='d-flex justify-content-center'>Đăng ký</h3>
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Row className="">
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label column="sm">Họ và tên</Form.Label>
                            <Form.Control size="sm" 
                                required
                                type="text"
                                placeholder="Họ và tên"
                                defaultValue=""
                                name="fullname"
                                
                            />
                            <Form.Control.Feedback>Tốt!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="">
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label column="sm">Địa chỉ</Form.Label>
                            <Form.Control size="sm" 
                                required
                                type="text"
                                placeholder="Địa chỉ"
                                defaultValue=""
                                name="address"
                            />
                            <Form.Control.Feedback>Tốt!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="">
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label column="sm">Email</Form.Label>
                            <Form.Control size="sm"
                                required
                                placeholder="Email"
                                defaultValue=""
                                type="email"
                                name="email"
                            />
                            <Form.Control.Feedback>Tốt!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="">
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label column="sm">Mật khẩu</Form.Label>
                            <Form.Control size="sm"
                                required
                                placeholder="Mật khẩu"
                                defaultValue=""
                                type="password"
                                name="password"
                            />
                            <Form.Control.Feedback>Tốt!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-1">
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label column="sm">Lập lại mật khẩu</Form.Label>
                            <Form.Control size="sm"
                                required
                                placeholder="Lập lại mật khẩu"
                                defaultValue=""
                                type="password"
                                name="repassword"
                            />
                            <Form.Control.Feedback>Tốt!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    {/* <Recaptcha
                        sitekey="xxxxxxxxxxxxxxxxxxxx"
                        render="explicit"
                        // verifyCallback={verifyCallback}
                        onloadCallback={callback}
                        
                    />, */}
                    <Row className='mb-3 mt-3' >
                        <Form.Group >
                            <Button type="submit" className='col-md-12'>Đăng ký</Button>
                        </Form.Group>

                    </Row>
                    <Row >
                        <Form.Group >
                            <Link to='/login'> <Button type="submit" className='col-md-12'>Quay về đăng nhập</Button></Link>
                        </Form.Group>
                    </Row>
                    <Link to='/' style={{fontSize:'0.72rem', textDecoration: 'underline'}}>Quay về trang chủ</Link>
                </Form>
            </div>
        </div>
    );
}