import { Tabs,  Tab } from 'react-bootstrap';
import SellerAutionHistory from '../../components/SellerAutionHistory';
import BidderAutionHistory from '../../components/BidderAutionHistory';
import UserNavBar from '../../components/UserNavBar';
import { useSelector, useDispatch } from "react-redux";
import { selectUser,getUserInfo } from './UserSlice';
import { useState,useEffect } from 'react';

export default function AutionProductsHistory() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [buyer,setBuyer] = useState(true);

    
    useEffect(() => {
        dispatch(getUserInfo());
        if(user && user.role_id == 2){
            setBuyer(false);
        }
       
    }, [dispatch])

    console.log(user)
    return (
        <div className="container">
            <UserNavBar />
            <Tabs defaultActiveKey="buyer" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="buyer" title="Mua">
                    <h5 className="d-flex justify-content-center mt-4">Lịch sử sản phẩm bạn đã mua!</h5>
                    <SellerAutionHistory/>
                </Tab>
                <Tab eventKey="seller" title="Bán" disabled={buyer}>
                    <h5 className="d-flex justify-content-center mt-4">Lịch sử sản phẩm bạn đem đấu giá!</h5>
                   <BidderAutionHistory/>
                </Tab>
            </Tabs>
        </div>
    )
}