import {  Row, Col, Image, Button } from 'react-bootstrap';
import { GrUpdate } from 'react-icons/gr';
import UserNavBar from '../../components/UserNavBar';

export default function UserProfile() {
    return (
        <>
            <UserNavBar/>
            <div className="card mb-3 mt-4 no-gutters" >
                <div className="row no-gutters">
                    <Row >
                        <Col className="col-md-4 m-2">
                            <Row>
                                <title>Placeholder</title>

                                <Image src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" fluid />
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
                                        Loại tài khoản: seller
                                        <br />
                                    </p>


                                </div>
                                <Button variant="primary"><GrUpdate /> Cập nhật</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button variant="primary"><GrUpdate /> Đổi mật khẩu</Button>
                            </div>
                        </Col >
                    </Row>
                </div>
            </div>
        </>
    )
}