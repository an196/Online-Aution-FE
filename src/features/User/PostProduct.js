import { Nav, Navbar } from 'react-bootstrap';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const styles = {
    text: {
        fontSize: '0.7rem'
    },
    space: {
        width: 10,
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
    }
}

export default function PostProduct() {
    return (
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
                        <Link to="/user/post" style={styles.linkNavActive}> Đăng bài</Link>
                    </Nav>
                </Navbar.Collapse>
                <Link to="#" ><CgProfile size={24} style={{ color: 'grey' }} /></Link>
                <div style={styles.space} />
            </Navbar>
            <h5 className="d-flex justify-content-center mt-4">Đăng bài!</h5>
        </div>
    )
}