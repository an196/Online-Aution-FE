import { Tabs, Tab } from 'react-bootstrap';
import ProductAutioning from '../../components/ProductAutioning';
import ProductShefing from '../../components/ProductShefing';
import UserNavBar from '../../components/UserNavBar';

export default function AutionProducts() {
    return (
        <>
            <UserNavBar/>
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