import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';
import { CgProfile } from 'react-icons/cg';
import { FaSignOutAlt } from 'react-icons/fa';
import { useHistory } from "react-router";
import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectUser, getUserInfo } from '../features/User/UserSlice';    


export default function UserNavBar(props) {
    const history = useHistory();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [buyer,setBuyer] = useState(true);

    const handleLogout = function (e) {
        e.preventDefault();
        localStorage.removeItem('x_accessToken');
        localStorage.removeItem('x_refreshToken');
        history.push('/login')
    }

    
    useEffect(() => {
        dispatch(getUserInfo());
        if(user && user.role_id == 2){
            setBuyer(false);
        }
       
    }, [dispatch]);

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
                        {!buyer?
                            <LinkContainer to="/user/post"><Nav.Link > Đăng bài</Nav.Link></LinkContainer>
                            :null
                        }
                        
                    </Nav>
                    <Nav>
                        <LinkContainer to="/user/profile" ><Nav.Link ><CgProfile className='m-2' /></Nav.Link></LinkContainer>
                        <LinkContainer to='/' onClick={handleLogout} ><Nav.Link ><FaSignOutAlt className='m-2' /></Nav.Link></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}