import Category from '../components/Category.js';
import Footer from '../components/Footer.js';
import NavigationBar from '../components/NavigationBar.js';

export default function HomePage(props) {
    return (
        <div className = 'container'>
            <NavigationBar/>
            <Category/>
            <Footer/>
        </div>
    ) 
};