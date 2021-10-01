import { Nav, Navbar } from 'react-bootstrap';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import UserNavBar from '../../components/UserNavBar';


export default function PostProduct() {
    return (
        <>
        <UserNavBar/>
        <h5 className="d-flex justify-content-center mt-4">Đăng bài!</h5>
       </>
    )
}