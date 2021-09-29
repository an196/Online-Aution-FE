import {  Nav, Navbar } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

export default function Dashboard() {
    return (
        <div className="container">
            <Navbar bg="dark" variant="dark">
                <Navbar.Collapse id="responsive-navbar-nav">
                    <div style={{width: 10}}></div>
                    <Navbar.Brand href="/">OnAution</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/admin/category">Danh mục</Nav.Link>
                        <Nav.Link href="/admin/product">Sản phẩm</Nav.Link>
                        <Nav.Link href="/admin/user">Người dùng</Nav.Link>
                    </Nav>
                    <Nav className = "mr-5">
                    <Nav.Link href="#action1" className = "mr-1"> < FaUser/></Nav.Link>
                    <div style={{width: 10}}></div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <h2 className = "d-flex justify-content-center mt-4">Chào mừng bạn đến Admin!</h2>
        </div>
    )
}