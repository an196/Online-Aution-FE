import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState } from 'react';
//import Recaptcha from 'react-recaptcha';
import authApi from '../api/authApi';

export default function SignupPage(){
    const [validated, setValidated] = useState(false);
    

    const [nameUser, setNameUser] = useState('');
    const handleSubmit = (event) => {
        

        const form = event.currentTarget;
        if (form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            // if(event.target.password.value === event.target.repassword.value){

            // }
            const data = {
                full_name: event.target.username.value,
                address: event.target.address.value,
                email: event.target.email.value,
                password: event.target.password.value,
            }
            alert(event.target.username.value)
            
            const response =  authApi.signUp(data);
            console.log(response);
        }
        else{
            alert("sssss")
        }

        setValidated(true);
    };
    function onChange(value) {
        console.log("Captcha value:", value);
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
                                name="username"
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
                                type="text"
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
                                type="text"
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
                                type="text"
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
                    <Button type="submit">Submit form</Button>
                </Form>
            </div>
        </div>
    );
}