import Footer from '../components/Footer.js';
import NavigationBar from '../components/NavigationBar.js';
import ProductDetail from '../components/ProductDetail.js';

export default function ProductDetailPage(props) {
    return (
        <div className = 'container'>
            <NavigationBar/>
                <ProductDetail/>
            <Footer/>
        </div>
    ) 
};