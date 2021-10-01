
import {  Navbar, Nav, Tabs, Tab } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import BiddenReview from '../../components/BidderReview';
import SellerReview from '../../components/SellerReview';

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

export default function ReviewProduct() {
    const [key, setKey] = useState('home');

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
                            <Link to="/user/aution-history" style={styles.linkNav}> Lịch sử đấu giá</Link>
                            <div style={styles.space}/>
                            <Link to="/user/aution" style={styles.linkNav}> Đấu giá</Link>
                            <div style={styles.space}/>
                            <Link to="/user/review" style={styles.linkNavActive}> Đánh giá</Link>
                            <div style={styles.space}/>
                            <Link to="/user/post" style={styles.linkNav}> Đăng bài</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Link to="/user/profile"  ><CgProfile size={24} style={{ color: 'grey' }} /></Link>
                    <div style={styles.space} />
                </Navbar>
            </div>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="">
                <Tab eventKey="home" title="Mua">
                    <SellerReview />
                </Tab>
                <Tab eventKey="profile" title="Bán">
                    <BiddenReview />
                </Tab>
            </Tabs>
        </>
    );
}
