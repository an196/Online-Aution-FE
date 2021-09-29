import { Navbar, Nav, NavDropdown, Form, FormControl, Button   } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";

export default function NavigationBar(){
    return(
        <Navbar bg="light" expand="lg">
            <div style={{width:10}}></div>
            <Navbar.Brand className="mr-auto " href="/">OnAution</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <NavDropdown title="Link 1" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Link 2" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Link 3" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Link 4" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form className="d-flex justify-content-around">
                    <FormControl 
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                    />
                    
                </Form>
            </Navbar.Collapse>
            <Button  variant="outline-success" >Search</Button>
            <Nav.Link href="#action1"> < FaShoppingCart/></Nav.Link>
        </Navbar>
    )
   };