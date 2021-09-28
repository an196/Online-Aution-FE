
import Footer from '../components/Footer.js';
import Home from '../components/Home.js';
import NavigationBar from '../components/NavigationBar.js';

export default function HomePage(props) {
    return (
        <div className = 'container'>
            <NavigationBar/>
            <Home/>
            <Footer/>
        </div>
    ) 
};