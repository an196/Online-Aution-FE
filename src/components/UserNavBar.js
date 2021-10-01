import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';
import { CgProfile } from 'react-icons/cg';

export default function UserNavBar() {
    return (
        <div >
            <Navbar bg="dark" variant="dark">
                <Navbar.Collapse id="responsive-navbar-nav">
                    <div style={{ width: 10 }}></div>
                    <LinkContainer to="/"><Navbar.Brand>OnAution</Navbar.Brand></LinkContainer>
                    <Nav className="me-auto">
                        <LinkContainer to="/user/favorite"><Nav.Link > Ưa thích</Nav.Link></LinkContainer>
                        <LinkContainer to="/user/aution-history" ><Nav.Link > Lịch sử đấu giá</Nav.Link></LinkContainer>
                        <LinkContainer to="/user/aution"><Nav.Link > Đấu giá</Nav.Link></LinkContainer>
                        <LinkContainer to="/user/review"><Nav.Link > Đánh giá</Nav.Link></LinkContainer>
                        <LinkContainer to="/user/post"><Nav.Link > Đăng bài</Nav.Link></LinkContainer>
                    </Nav>
                    <Nav>
                    <LinkContainer to="/user/profile" ><Nav.Link ><CgProfile className='m-2'/></Nav.Link></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}