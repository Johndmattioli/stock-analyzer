import logo from './logo.svg';
import './App.css';
import InputForm from "./InputForm";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Truck Stop Finance</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#stockAnalyzer">Stock Analyzer</Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link href="#news">News</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">John Mattioli</a>
            </Navbar.Text>
          </Navbar.Collapse>

        </Container>
      </Navbar>
      <InputForm />
    </div>
  );
}

export default App;
