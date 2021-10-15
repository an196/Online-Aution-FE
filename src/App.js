import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductTable from '../src/features/Admin/ProductTable';
import CategoryTable from '../src/features/Admin/CategoryTable';
import UserTable from '../src/features/Admin/UserTable';
import FavoriteProducts from '../src/features/User/FavoriteProducts';
import UserProfile from './features/User/UserProfile';
import AutionProductsHisory from './features/User/AutionProductsHisory';
import AutionProducts from './features/User/AutionProducts';
import ReviewProduct from './features/User/ReviewProducts';
import PostProduct from './features/User/PostProduct';
import AdminPage from './pages/AdminPage';
import OtpPage from './pages/OtpPage';
import NotFoundPage from './pages/NotFoundPage';
import SearchResultPage from './pages/SearchResultPage';
import WaitUpgrade from '../src/features/Admin/WaitUpgrade';
import BidderTable from './features/Admin/BidderTable';
import SellerTable from './features/Admin/SellerTable';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/signup" exact>
          <SignupPage />
        </Route>
        <Route path="/signup/otp" exact>
          <OtpPage />
        </Route>
        <Route path="/product/search" exact component={SearchResultPage}>
        </Route>
        <Route path="/product/detail/:id" exact component={ProductDetailPage}>
        </Route>
        <Route path="/category/:id" exact exact component={CategoryPage}>
        </Route>
        <PrivateRoute path="/user/favorite" exact>
          <FavoriteProducts />
        </PrivateRoute>
        <PrivateRoute path="/user/aution-history" exact>
          <AutionProductsHisory />
        </PrivateRoute>
        <PrivateRoute path="/user/profile" exact>
          <UserProfile />
        </PrivateRoute>
        <PrivateRoute path="/user/aution" exact>
          <AutionProducts />
        </PrivateRoute>
        <PrivateRoute path="/user/review" exact>
          <ReviewProduct />
        </PrivateRoute>
        <PrivateRoute path="/user/post" exact>
          <PostProduct />
        </PrivateRoute>
        <PrivateRoute path="/admin" exact>
          <AdminPage />
        </PrivateRoute>
        <PrivateRoute path="/admin/product" exact>
          <ProductTable />
        </PrivateRoute>
        <PrivateRoute path="/admin/category" exact>
          <CategoryTable />
        </PrivateRoute>
        <PrivateRoute path="/admin/seller" exact>
          <SellerTable />
        </PrivateRoute>
        <PrivateRoute path="/admin/bidder" exact>
          <BidderTable />
        </PrivateRoute>
        <PrivateRoute path="/admin/upgrade" exact>
          <WaitUpgrade/>
        </PrivateRoute>
        <Route path="*" component={NotFoundPage}>
          {/* <CategoryPage/> */}
        </Route>
      </Switch>
    </Router>

  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route {...rest} render={function () {
      return localStorage.x_accessToken ?
        children :
        <Redirect to={{ pathname: '/login' }} />;
    }} />
  );
}

export default App;
