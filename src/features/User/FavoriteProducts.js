import {  Nav, Navbar } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

export default function FavoriteProducts() {
    return (
        <div className="container">
            <Navbar bg="dark" variant="dark">
                <Navbar.Collapse id="responsive-navbar-nav">
                    <div style={{width: 10}}></div>
                    <Navbar.Brand href="/">OnAution</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#">SP ưa thích</Nav.Link>
                        <Nav.Link href="/user/aution">SP đấu giá</Nav.Link>
                        <Nav.Link href="/user/shef">SP lên kệ</Nav.Link>
                        <Nav.Link href="/user/profile">Hồ sơ</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <h2 className = "d-flex justify-content-center mt-4">Chào mừng bạn đến trang ưa thích!</h2>
        </div>
    )
}