
import { Tabs, Tab } from 'react-bootstrap';
import { useState } from 'react';
import BiddenReview from '../../components/BidderReview';
import SellerReview from '../../components/SellerReview';
import UserNavBar from '../../components/UserNavBar';


export default function ReviewProduct() {
    const [key, setKey] = useState('home');

    return (
        <>
            <UserNavBar/>
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
