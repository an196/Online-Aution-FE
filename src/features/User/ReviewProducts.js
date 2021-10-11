
import { Tabs, Tab } from 'react-bootstrap';
import { useState } from 'react';
import BiddenReview from '../../components/BidderReview';
import SellerReview from '../../components/SellerReview';
import UserNavBar from '../../components/UserNavBar';
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from './UserSlice';


export default function ReviewProduct() {
    const [key, setKey] = useState('home');
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [buyer,setBuyer] = useState(false);

    if(user && user.role_id == 2){
        setBuyer(true);
    }

    return (
        <>
            <UserNavBar/>
            <Tabs defaultActiveKey="buyer" id="uncontrolled-tab-example" className="">
                <Tab eventKey="buyer" title="Mua">
                    <SellerReview />
                </Tab>
                <Tab eventKey="seller" title="Bán" disabled={!buyer}>
                    <BiddenReview />
                </Tab>
            </Tabs>
        </>
    );
}
