import { Tabs,  Tab } from 'react-bootstrap';
import SellerAutionHistory from '../../components/SellerAutionHistory';
import BidderAutionHistory from '../../components/BidderAutionHistory';
import UserNavBar from '../../components/UserNavBar';
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
    }
}

export default function AutionProductsHistory() {
    return (
        <>
            <UserNavBar/>
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