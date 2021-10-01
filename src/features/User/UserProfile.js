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
    },
    logoText: {
        textDecoration: 'none',
        color: 'white'
    },
    space: {
        width: 10,
    }
}

export default function UserProfile() {
    return (
        <>
            <div >
                <Navbar bg="dark" variant="dark">
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <div style={styles.space} />
                        <Navbar.Brand ><Link to='/' style={styles.logoText}>OnAution</Link></Navbar.Brand>
                        <Nav className="me-auto">
                            <Link to="/user/favorite" style={styles.linkNav}> Ưa thích</Link>
                            <div style={styles.space} />
                            <Link to="/user/aution-history" style={styles.linkNav}> Lịch sử đấu giá</Link>
                            <div style={styles.space} />
                            <Link to="/user/aution" style={styles.linkNav}> Đấu giá</Link>
                            <div style={styles.space} />
                            <Link to="/user/review" style={styles.linkNav}> Đánh giá</Link>
                            <div style={styles.space} />
                            <Link to="/user/post" style={styles.linkNav}> Đăng bài</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Link to="#" ><CgProfile size={24} style={{ color: 'white' }} /></Link>
                    <div style={styles.space} />
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