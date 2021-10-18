import { Row, Col, Image, Button } from 'react-bootstrap';
import { GrUpdate } from 'react-icons/gr';
import UserNavBar from '../../components/UserNavBar';
import { BsArrowBarUp } from 'react-icons/bs'
import { useSelector, useDispatch } from "react-redux";
import { selectProfile, getProfile } from './UserSlice';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { NotifyHelper } from '../../helper/NotifyHelper';

export default function UserProfile() {
    const profile = useSelector(selectProfile);
    const dispatch = useDispatch();
    const [buyer, setBuyer] = useState(true);
    const [request_update, setRequestUpgrade] = useState(false);
    const account_id = jwt_decode(localStorage.x_accessToken).account_id;
    const role_id = jwt_decode(localStorage.x_accessToken).role_id;


    function handleUpgrade() {

        const data = {
        };

        let headers = {};
        headers['x-access-token'] = localStorage.x_accessToken ? localStorage.x_accessToken : null;
        headers['x-refresh-token'] = localStorage.x_refreshToken ? localStorage.x_refreshToken : null;

        let config = {
            headers: { ...headers }
        }

        axios
            .post(`http://localhost:3002/api/bidder/account/requestUpgrade`, data, config)
            .then(function (res) {
                if (res.status === 200) {
                    NotifyHelper.success(res.data.message, "Thông báo")
                }
            })
            .catch(function (error) {
                NotifyHelper.error(error, "Thông báo");
                console.log(error)
            });
    }

    useEffect(() => {
        dispatch(getProfile());

        if (role_id === 2) {
            setBuyer(false);
        }

        if(profile && profile.request_update === 1){
            setRequestUpgrade(true);
        }
        
}, [dispatch,setBuyer,setRequestUpgrade, handleUpgrade])
    console.log(profile)


    return (
        <Row>
            <Col></Col>
            <Col xs={8}>
                <UserNavBar />
                <div className="card mb-3 mt-4 no-gutters m-auto p-4 col-md-7 d-flex justify-content-center" >
                    <div className="row no-gutters">
                        <Row >
                            <Col className="col-md-4 m-2">
                                <Row>
                                    <title>Avatar</title>
                                    <Image src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" fluid />
                                    {buyer && !request_update? 
                                    <Button variant="success" onClick={handleUpgrade} size="sm" className='mt-4 m-auto col-md-10'>
                                        <BsArrowBarUp />
                                        Nâng cấp seller
                                    </Button>
                                    :null}
                                    {
                                        request_update? 
                                        <Button variant="secondary" disabled size="sm" className='mt-4 m-auto col-md-10'>
                                        
                                        Đang chờ duyệt
                                    </Button>
                                    :null}
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
                                                <b>Địa chỉ:  </b>{profile.address}<br />
                                                <b>Email:  </b>{profile.email}
                                                <br />
                                                <b>Điện thoại:  </b>{profile.phone}
                                                <br />
                                                <b>Điểm đánh giá:  </b>{profile.evaluation_score}
                                                <br />
                                                <b>Loại tài khoản:  </b>{profile.role_name}
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
            </Col>
            <Col></Col>
        </Row>
    )
}