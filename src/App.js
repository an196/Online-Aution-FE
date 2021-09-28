import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import HomePage from './pages/HomePage';


function App() {
  return (

    <Router>

      <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
      <script
        src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
        crossorigin>
      </script>
      <script
        src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossorigin>
      </script>

      <script>var Alert = ReactBootstrap.Alert;</script>



      <Container>
        <Row>
          <Col></Col>
          <Col xs={8}>
            <Switch>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Router>

  );
}

export default App;
