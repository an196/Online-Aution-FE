import { Row, Col, Image, Button } from 'react-bootstrap';
import { GrUpdate } from 'react-icons/gr';
import UserNavBar from '../../components/UserNavBar';
import { BsArrowBarUp } from 'react-icons/bs'
import { useSelector, useDispatch } from "react-redux";
import { selectProfile, getProfile } from './UserSlice';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export default function UserProfile() {
    const profile = useSelector(selectProfile);
    const dispatch = useDispatch();
    const [buyer, setBuyer] = useState(false);
    const account_id = jwt_decode(localStorage.x_accessToken).account_id;
    const role_id = jwt_decode(localStorage.x_accessToken).role_id;

    useEffect(() => {
        if (role_id == 2) {
            setBuyer(false);
        }
        dispatch(getProfile())
    }, [dispatch])
    console.log(profile)
    return (
        <div className="container">
            <UserNavBar />
            <div className="card mb-3 mt-4 no-gutters m-auto p-4 col-md-7 d-flex justify-content-center" >
                <div className="row no-gutters">
                    <Row >
                        <Col className="col-md-4 m-2">
                            <Row>
                                <title>Placeholder</title>

                                <Image src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" fluid />

                                <Button variant="success" size="sm" className='mt-4 m-auto col-md-10'><BsArrowBarUp />Nâng cấp seller</Button>
                            </Row>
                        </Col >
                        {profile ?
                            <Col className="col-md-7 m-2">
                                <div >
                                    <div className="card-body">
                                        <h5 className="card-title"> {profile.full_name}
                                        </h5>
                                        <p className="card-text">
                                           <b>Giới tính:  </b> {profile.Gender}<br />
                                           <b>Địa chỉ:  </b>{profile.address }<br />
                                           <b>Email:  </b>{ profile.email}
                                            <br />
                                            <b>Điện thoại:  </b>{ profile.phone}
                                            <br />
                                            <b>Điểm đánh giá:  </b>{ profile.evaluation_score}
                                            <br />
                                            <b>Loại tài khoản:  </b>{ profile.role_name}
                                            <br />
                                        </p>
                                    </div>
                                    <Button variant="primary" size="sm" className='mb-3'><GrUpdate /> Cập nhật</Button>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button variant="primary" size="sm" className='mb-3'><GrUpdate /> Đổi mật khẩu</Button>
                                </div>
                            </Col >
                            : null}
                    </Row>
                </div>
            </div>
        </div>
    )
}