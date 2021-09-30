import { Nav, Navbar, Row, Col, Image, Button } from 'react-bootstrap';
import { GrUpdate } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const styles = {
    cartProfile: {
        innerHeight: 200
    },
    link: {
        textDecoration: 'none',
    },

    linkNavActive: {
        textDecoration: 'none',
        color: 'white'
    },
    linkNav: {
        textDecoration: 'none',
        color: 'grey'
    }
}

export default function UserProfile() {
    return (
        <>
            <div >
                <Navbar bg="dark" variant="dark">
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <div style={{ width: 10 }}></div>
                        <Navbar.Brand href="/">OnAution</Navbar.Brand>
                        <Nav className="me-auto">
                            <Link to="/user/favorite" style={styles.linkNav}> SP ưa thích</Link>
                            <div style={{ width: 10 }} />
                            <Link to="/user/aution" style={styles.linkNav}> SP đấu giá</Link>
                            <div style={{ width: 10 }} />
                            <Link to="/user/shef" style={styles.linkNav}> SP lên kệ</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Link to="#" className='m-3' ><CgProfile size={24} style={{ color: 'white' }} /></Link>
                </Navbar>
                <h5 className="d-flex justify-content-center mt-4">Thông tin của bạn!</h5>
            </div>
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