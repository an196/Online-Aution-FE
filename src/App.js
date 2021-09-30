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
import Dashboard from '../src/features/Admin/Dashboard';
import ProductTable from '../src/features/Admin/ProductTable';
import CategoryTable from '../src/features/Admin/CategoryTable';
import UserTable from '../src/features/Admin/UserTable';
import FavoriteProducts from '../src/features/User/FavoriteProducts';
import UserProfile from './features/User/UserProfile';
import AutionProducts from './features/User/AutionProducts';
import ShefProducts from './features/User/ShefProducts';

function App() {
  return (
    <Router>
     

      <Container>
        <Row>
          <Col></Col>
          <Col xs={8}>
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/login" exact>
                <LoginPage/>
              </Route>
              <Route path="/sigup" exact>
                <SignupPage/>
              </Route>
              <Route path="/product/detail" exact>
                <ProductDetailPage/>
              </Route>
              <Route path="/category" exact>
                <CategoryPage/>
              </Route>
              <Route path="/user/favorite" exact>
                <FavoriteProducts/>
              </Route>
              <Route path="/user/aution" exact>
                <AutionProducts/>
              </Route>
              <Route path="/user/profile" exact>
                <UserProfile/>
              </Route>
              <Route path="/user/shef" exact>
                <ShefProducts/>
              </Route>
              <Route path="/admin" exact>
                <Dashboard/>
              </Route>
              <Route path="/admin/product" exact>
                <ProductTable/>
              </Route>
              <Route path="/admin/category" exact>
                <CategoryTable/>
              </Route>
              <Route path="/admin/user" exact>
                <UserTable/>
              </Route>
            </Switch>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Router>

  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route {...rest} render={function () {
      return localStorage.todoApp_accessToken ?
        children :
        <Redirect to={{ pathname: '/login' }} />;
    }} />
  );
}

export default App;
