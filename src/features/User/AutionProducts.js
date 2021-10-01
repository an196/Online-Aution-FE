import { Nav, Navbar,Tabs, Tab } from 'react-bootstrap';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import ProductAutioning from '../../components/ProductAutioning';
import ProductShefing from '../../components/ProductShefing';

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
    logoText:{
        textDecoration: 'none',
        color: 'white'
    },
    space:{
        width:10,
    }
}

export default function AutionProducts() {
    return (
        <>
            <div >
                <Navbar bg="dark" variant="dark">
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <div style={{ width: 10 }}></div>
                        <Navbar.Brand><Link to='/' style={styles.logoText}>OnAution</Link></Navbar.Brand>
                        <Nav className="me-auto">
                            <Link to="/user/favorite" style={styles.linkNav}> Ưa thích</Link>
                            <div style={styles.space}/>
                            <Link to="/user/aution-history" style={styles.linkNav}> Lịch sử đấu giá</Link>
                            <div style={styles.space}/>
                            <Link to="/user/aution" style={styles.linkNavActive}> Đấu giá</Link>
                            <div style={styles.space}/>
                            <Link to="/user/review" style={styles.linkNav}> Đánh giá</Link>
                            <div style={styles.space}/>
                            <Link to="/user/post" style={styles.linkNav}> Đăng bài</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Link to="/user/profile" ><CgProfile size={24} style={{ color: 'grey' }} /></Link>
                    <div style={{ width: 10 }} />
                </Navbar>
                
            </div>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="">
                <Tab eventKey="home" title="Mua">
                    <h5 className="d-flex justify-content-center mt-4">Sản phẩm đang bạn đang đấu giá !</h5>
                    <ProductAutioning />
                </Tab>
                <Tab eventKey="profile" title="Bán">
                <h5 className="d-flex justify-content-center mt-4">Sản phẩm đang bán của bạn!</h5>
                    <ProductShefing />
                </Tab>
            </Tabs>
           
        </>
    )
}