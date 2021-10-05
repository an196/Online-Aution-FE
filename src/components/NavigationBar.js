import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {
    selectTypeInfo,
    getTypeInfo,

} from '../features/product/typeSlice';
import { useHistory } from "react-router";
import { selectUser, setUser } from "../features/User/UserSlice";

export default function NavigationBar() {
    const typeInfo = useSelector(selectTypeInfo);
    const dispath = useDispatch();
    const history = useHistory();
    const user = useSelector(selectUser);

    const handleClick = function (e) {
        e.preventDefault();
        
        if(localStorage.x_accessToken){
            switch(user.role_id){
                case 1:
                case 2:
                    history.push("/user/favorite");
                    break;
                case 3:
                    history.push("/admin");
                    break;
                default:
                    break;
            }
        }
        else{
            history.push("/login")
        }
      }

    useEffect(() => {
        dispath(getTypeInfo());
    }, [dispath]);


    return (
        <>
            <Navbar bg="light" expand="lg">
                <div className='p-3' style={{ width: 10 }}></div>
                <LinkContainer to='/'><Navbar.Brand className="mr-auto ">OnAution</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">

                </Navbar.Collapse>
                <Form className="d-flex justify-content-around">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                    />
                </Form>
                <div style={{ width: 10 }}></div>
                <Button variant="outline-success" >Search</Button>
                <LinkContainer to='/' onClick={handleClick} ><Nav.Link ><FaShoppingCart  className='m-2'/></Nav.Link></LinkContainer>
            </Navbar>
            <Navbar bg="dark" variant="dark" expand="lg">
                <div style={{ width: 10 }}></div>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {typeInfo ? typeInfo.map((type) =>
                            <NavDropdown title={type.types.name} id="navbarScrollingDropdown" key={type.types.type_id}>
                                {type.categories ? type.categories.map((category) =>
                                    <LinkContainer title={category.name} to={`/category/${category.category_id}`} key={category.category_id}>
                                        <NavDropdown.Item >{category.name}</NavDropdown.Item>
                                    </LinkContainer>

                                ) : null}

                            </NavDropdown>
                        ) : null}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
};