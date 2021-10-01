import { Nav, Navbar, Tabs,  Tab } from 'react-bootstrap';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import SellerAutionHistory from '../../components/SellerAutionHistory';
import BidderAutionHistory from '../../components/BidderAutionHistory';

const styles = {
    card: {
        //backgroundColor: '#B7E0F2',
        borderRadius: 5,
        width: '8.8rem'
    },
    cardImage: {
        objectFit: 'cover',
        borderRadius: 55,
        with: '8.8rem',
    },
    cardTitle: {
        fontSize: '0.8rem'
    },
    cardBody: {
        width: '8.8rem'
    },
    cardText: {
        fontSize: '0.6rem'
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

export default function AutionProductsHistory() {
    return (
        <>
            <div >
                <Navbar bg="dark" variant="dark">
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <div style={styles.space} />
                        <Navbar.Brand><Link to='/' style={styles.logoText}>OnAution</Link></Navbar.Brand>
                        <Nav className="me-auto">
                            <Link to="/user/favorite" style={styles.linkNav}> Ưa thích</Link>
                            <div style={styles.space}/>
                            <Link to="/user/aution-history" style={styles.linkNavActive}> Lịch sử đấu giá</Link>
                            <div style={styles.space}/>
                            <Link to="/user/aution" style={styles.linkNav}> Đấu giá</Link>
                            <div style={styles.space}/>
                            <Link to="/user/review" style={styles.linkNav}> Đánh giá</Link>
                            <div style={styles.space}/>
                            <Link to="/user/post" style={styles.linkNav}> Đăng bài</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Link to="/user/profile"><CgProfile size={24} style={{ color: 'grey' }} /></Link>
                    <div style={styles.space} />
                </Navbar>
                
            </div>

            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="Mua">
                    <h5 className="d-flex justify-content-center mt-4">Lịch sử sản phẩm bạn đã mua!</h5>
                    <SellerAutionHistory/>
                </Tab>
                <Tab eventKey="profile" title="Bán">
                    <h5 className="d-flex justify-content-center mt-4">Lịch sử sản phẩm bạn đem đấu giá!</h5>
                   <BidderAutionHistory/>
                </Tab>
            </Tabs>
        </>
    )
}