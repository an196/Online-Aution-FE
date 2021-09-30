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

function App() {
  return (
    <Router>
      <script src="https://unpkg.com/react/umd/react.production.min.js" ></script>
      <script
        src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
        >
      </script>
      <script
        src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
        >
      </script>
      <script>var Alert = ReactBootstrap.Alert;</script>

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
