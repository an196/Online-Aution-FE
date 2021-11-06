import { Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link, Redirect } from 'react-router-dom';
import ReactHtmlParser from "react-html-parser";
import {  addWatchList,  removeWatchList } from '../features/User/UserSlice';
import {
    formatDateTime,
    formatProductName,
    formatPrice,
} from '../utils/utils';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

const styles = {

    card: {
        //backgroundColor: '#B7E0F2',
        borderRadius: 5,
        width: '8.8rem'
    },
    cardImage: {
        objectFit: 'cover',
        width: '8.6rem',
        height: '8.6rem',
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
}

export default function AuctionHistoryCard({ item }) {
    const defaultImg = '../../public/images.png/100px250';
    //const [like, setlike] = useState();
    const dispatch = useDispatch();
   
    const history = useHistory();


    const id = item.product_id;
    const data = {
        ...item,
        name: formatProductName(item.name),
        current_cost: formatPrice(item.current_cost),
        buy_now: formatPrice(item.buy_now),
        start_day: formatDateTime(item.start_day),
        end_day: formatDateTime(item.end_day),
        image: item.image ? item.image : defaultImg
    };

   

    return (
        <Col>{data ?
            <div>
                <Card style={styles.card}>
                    <Card.Img variant="top" src={data.image} style={styles.cardImage} />
                    <Card.Body style={styles.cardBody}>
                        <Card.Title style={styles.cardTitle} className='mt-1'> {data.name} &nbsp;&nbsp;&nbsp;&nbsp;
                        </Card.Title>
                        <Card.Text style={styles.cardText} >
                            Giá: {data.current_cost}
                            <br />
                            Người bán:  {data.seller_name.length > 13 ? data.seller_name :
                                <>
                                    {data.seller_name}
                                    {ReactHtmlParser('&nbsp;')}
                                </>
                            }
                            <br />
                            Người thắng: {data.bidder_name}
                            <br />
                            Ngày đăng: {data.start_day}
                            <br />
                            <a role='text' style={{ textDecoration: 'none' }} className="text-danger">Hạn: {data.end_day}</a>
                            <br />
                            Lượt đấu giá: {data.count_auction}
                            <br />
                            <Link to={`/product/detail?productid=${data.product_id}`} style={{ fontSize: '0.6rem' }}>Xem chi tiết</Link>



                        </Card.Text>
                        {/* <Row >
                            {
                                validUser ?
                                    <p role='button' className='d-flex justify-content-center' onClick={handleLike}>
                                        {like ? <AiFillHeart style={{ color: 'red' }} /> : <AiOutlineHeart />}
                                    </p>
                                    : null
                            }
                        </Row> */}
                    </Card.Body>
                </Card>
            </div>
            : null}
        </Col>

    )
}