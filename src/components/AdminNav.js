import { Nav, Navbar } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

export default function AdminNav() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Collapse id="responsive-navbar-nav">
                <div style={{ width: 10 }}></div>
                <LinkContainer to="/"><Navbar.Brand href="/">OnAution</Navbar.Brand></LinkContainer>
                <Nav className="me-auto">
                    <LinkContainer to="/admin/category"><Nav.Link >Danh mục</Nav.Link></LinkContainer>
                    <LinkContainer to="/admin/product"><Nav.Link >Sản phẩm</Nav.Link></LinkContainer>
                    <LinkContainer to="/admin/user"><Nav.Link >Người dùng</Nav.Link></LinkContainer>
                </Nav>
                <Nav className="mr-5">
                    <LinkContainer to="#"><Nav.Link className="mr-1"> < FaUser /></Nav.Link></LinkContainer>
                    <div style={{ width: 10 }}></div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}