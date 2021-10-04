import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {
    selectTypeInfo,
    getTypeInfo,

} from '../features/product/typeSlice';

export default function NavigationBar() {
    const typeInfo = useSelector(selectTypeInfo);
    const dispath = useDispatch();

    useEffect(() => {
        dispath(getTypeInfo());
    }, [dispath]);


    console.log(typeInfo);
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
                <Link to="/login" className="m-3"> < FaShoppingCart /></Link>
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
                                {type.categorys ? type.categorys.map((category) =>
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