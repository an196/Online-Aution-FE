import Footer from '../components/Footer.js';
import Home from '../components/Home.js';
import NavigationBar from '../components/NavigationBar.js';
import { Container,Col,Row  } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setUser,selectUser } from '../features/User/UserSlice.js';

export default function HomePage(props) {
    const user = useSelector(selectUser); 
    const dispatch = useDispatch();
   
    if(user.role_id== undefined){
        console.log('day')
        if(localStorage.x_accessToken){
           
            const data = jwt_decode(localStorage.x_accessToken);
            dispatch(setUser(data));
        }
    }
    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={8}>
                <NavigationBar/>
                <Home/>
                <Footer/>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
};