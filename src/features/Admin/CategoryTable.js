import { Container, Nav, Navbar,Table,Button } from 'react-bootstrap';
import { FaUser, FaRegTrashAlt, FaPencilAlt} from 'react-icons/fa';

export default function Dashboard() {
    return (
        <div className="container">
            <Navbar bg="dark" variant="dark">
                <Navbar.Collapse>
                    <div style={{width: 10}}></div>
                    <Navbar.Brand href="/">OnAution</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#" active>Danh mục</Nav.Link>
                        <Nav.Link href="/admin/product">Sản phẩm</Nav.Link>
                        <Nav.Link href="/admin/user">Người dùng</Nav.Link>
                        
                    </Nav>
                    <Nav className = "mr-5">
                    <Nav.Link href="#action1" className = "mr-1"> <FaUser/></Nav.Link>
                    <div style={{width: 10}}></div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Button className="m-2" variant="outline-success">Thêm</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>
                            <FaRegTrashAlt/>
                            <FaPencilAlt/>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}