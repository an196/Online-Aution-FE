import {  Row, Col, Image, Button } from 'react-bootstrap';
import { GrUpdate } from 'react-icons/gr';
import UserNavBar from '../../components/UserNavBar';
import {BsArrowBarUp} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from './UserSlice';
import { useState } from 'react';

export default function UserProfile() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [buyer,setBuyer] = useState(false);
    console.log(user)
    if(user && user.role_id == 1){
        setBuyer(true);
       
    }

    return (
        <div className="container">
            <UserNavBar/>
            <div className="card mb-3 mt-4 no-gutters m-auto p-4 col-md-6 d-flex justify-content-center" >
                <div className="row no-gutters">
                    <Row >
                        <Col className="col-md-4 m-2">
                            <Row>
                                <title>Placeholder</title>

                                <Image src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" fluid />
                                
                                <Button variant="success"  size="sm" className='mt-4 m-auto col-md-10'><BsArrowBarUp />Nâng cấp seller</Button>
                            </Row>
                        </Col >
                        <Col className="col-md-7 m-2">
                            <div >
                                <div className="card-body">
                                    <h5 className="card-title">Cậu vàng
                                    </h5>
                                    <p className="card-text">
                                        Địa chỉ: 1300 Nguyễn Trãi, quận 5, tp HCM <br />
                                        Email: Gold@gmail.com.vb
                                        <br />
                                        Loại tài khoản: biider
                                        <br />
                                    </p>
                                </div>
                                <Button variant="primary"  size="sm" className='mb-3'><GrUpdate /> Cập nhật</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button variant="primary"  size="sm" className='mb-3'><GrUpdate /> Đổi mật khẩu</Button>
                            
                                </div>
                        </Col >
                    </Row>
                </div>
            </div>
        </div>
    )
}