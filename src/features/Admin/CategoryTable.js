import {  Nav, Navbar,Table,Button } from 'react-bootstrap';
import { FaUser, FaRegTrashAlt, FaPencilAlt} from 'react-icons/fa';
import AdminNav from '../../components/AdminNav';

export default function Dashboard() {
    return (
        <div className="container">
            <AdminNav/>
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