import { Modal, Col, Container, Row, Button,Table } from 'react-bootstrap';


export default function AutionHistory(props) {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Lịch sử đấu giá
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Thời điểm</th>
                                    <th>Người mua</th>
                                    <th>Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>1/11/2019 10:43</td>
                                    <td>****Khoa</td>
                                    <td>6,000,000</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>1/11/2019 9:43</td>
                                    <td>****Quang</td>
                                    <td>5,900,000</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>1/11/2019 8:43</td>
                                    <td>****Tuấn</td>
                                    <td>5,800,000</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}