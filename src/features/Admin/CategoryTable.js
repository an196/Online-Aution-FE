import { Col, Row, Form, Button, Container } from 'react-bootstrap';
import { FaUser, FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';
import AdminNav from '../../components/AdminNav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { NotifyHelper } from '../../helper/NotifyHelper';
import DataTable from 'react-data-table-component';
import Footer from '../../components/Footer';

export default function CategoryTable() {
    const [categories, setCategories] = useState();
    const [types, setTypes] = useState();
    const [reload, setReload] = useState(false);
    const [validated, setValidated] = useState(false);
    const [visibleAddForm, setVisibleAddForm] = useState(false);
    const [visibleUpdateForm, setVisibleUpdateForm] = useState(false);
    const [selectedType, setSelectedType] = useState();
    const [dataUpdate, setDataUpdate] = useState();

    //call api ------------------------------------------------------------------------------------------------->
    function getCategories() {
        let headers = {};
        headers['x-access-token'] = localStorage.x_accessToken ? localStorage.x_accessToken : null;
        headers['x-refresh-token'] = localStorage.x_refreshToken ? localStorage.x_refreshToken : null;

        let config = {
            headers: { ...headers }
        }

        axios
            .get(`http://localhost:3002/api/admin/category`, config)
            .then(function (res) {
                console.log(res.data)
                if (res.status === 200) {
                    setCategories(res.data)
                }
            })
            .catch(function (error) {
                NotifyHelper.error(error, "Thông báo");
                console.log(error)
            });


    }

    function getType() {
        let headers = {};
        headers['x-access-token'] = localStorage.x_accessToken ? localStorage.x_accessToken : null;
        headers['x-refresh-token'] = localStorage.x_refreshToken ? localStorage.x_refreshToken : null;

        let config = {
            headers: { ...headers }
        }

        axios
            .get(`http://localhost:3002/api/types`, config)
            .then(function (res) {
                if (res.status === 200) {
                    setTypes(res.data);
                }
            })
            .catch(function (error) {
                NotifyHelper.error(error, "Thông báo");
                console.log(error)
            });


    }

    function deleteCategory(id) {

        let headers = {};
        headers['x-access-token'] = localStorage.x_accessToken ? localStorage.x_accessToken : null;
        headers['x-refresh-token'] = localStorage.x_refreshToken ? localStorage.x_refreshToken : null;

        let config = {
            headers: { ...headers }
        }

        axios
            .delete(`http://localhost:3002/api/admin/category?category_id=${id}`, config)
            .then(function (res) {
                console.log(res.data)
                if (res.status === 200) {
                    NotifyHelper.success(res.data.message, "Thông báo");
                    setReload(!reload);
                }
            })
            .catch(function (error) {
                NotifyHelper.error(error, "Thông báo");
                console.log(error)
            });


    }

    function addCategory(data) {

        let headers = {};
        headers['x-access-token'] = localStorage.x_accessToken ? localStorage.x_accessToken : null;
        headers['x-refresh-token'] = localStorage.x_refreshToken ? localStorage.x_refreshToken : null;

        let config = {
            headers: { ...headers }
        }

        axios
            .post(`http://localhost:3002/api/admin/category`, data, config)
            .then(function (res) {
                console.log(res.data)
                if (res.status === 200) {
                    NotifyHelper.success(res.data.message, "Thông báo");
                    setReload(!reload);
                }
            })
            .catch(function (error) {
                NotifyHelper.error(error, "Thông báo");
                console.log(error)
            });


    }

    function updateCategory(data) {

        let headers = {};
        headers['x-access-token'] = localStorage.x_accessToken ? localStorage.x_accessToken : null;
        headers['x-refresh-token'] = localStorage.x_refreshToken ? localStorage.x_refreshToken : null;

        let config = {
            headers: { ...headers }
        }

        axios
            .patch(`http://localhost:3002/api/admin/category`, data, config)
            .then(function (res) {
                console.log(res.data)
                if (res.status === 200) {
                    NotifyHelper.success(res.data.message, "Thông báo");
                    setReload(!reload);
                }
            })
            .catch(function (error) {
                NotifyHelper.error(error, "Thông báo");
                console.log(error)
            });


    }

    //set up talbe ----------------------------------------------------------------------------------->
    const columns = [
        {
            cell: (row) => <button onClick={() => clickHandler(row.category_id)}>Xóa</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            cell: (row) => <button onClick={() => clickUpdateHandler(row)}>Cập nhật</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'id',
            selector: row => row.category_id,
            sortable: true,
        },
        {
            name: 'Tên danh mục',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Mô tả',
            selector: row => row.description,
        },
        {
            name: 'Loại chuyên mục',
            selector: row => row.type_name,
        },
    ];

    //hanldle -------------------------------------------------------------------------------------------------------->
    function clickHandler(e) {
        deleteCategory(e);
    }

    function clickUpdateHandler(e) {
        console.log(e)
        setDataUpdate(e);
        setVisibleUpdateForm(!visibleUpdateForm);
    }

    function handleAddCategory(e) {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        if (form.checkValidity()) {
            const data = {
                name: e.target.categoryName.value,
                alias: e.target.alias.value,
                description: e.target.description.value,
                status: 1,
                type_id: selectedType ? Number(selectedType) : Number(types[0].type_id)
            }

            console.log(data)
            addCategory(data);
        }
        setValidated(true);
    }

    function handleSelectType(e) {
        //console.log(e.target.value)
        setSelectedType(e.target.value)
    }

    function handleUpdateCategory(e) {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        if (form.checkValidity()) {
            const data = {
                category_id: dataUpdate.category_id,
                name: e.target.categoryName.value,
                alias: e.target.alias.value,
                description: e.target.description.value,
                status: 1,
                type_id: selectedType ? Number(selectedType) : Number(types[0].type_id)
            }

            console.log(data)
            updateCategory(data);
        }
        setValidated(true);
    }

    //effect --------------------------------------------------------------------------------------------------------->
    useEffect(() => {
        getCategories();
        getType();
    }, [reload]);

    useEffect(() => {
    }, [categories]);

    //console.log(types)
    return (
        <Container >
            <AdminNav />
            <Row>
                <Row>
                    <Col className='m-3'>
                        <Button onClick={() => setVisibleAddForm(!visibleAddForm)} variant="outline-success">
                            {!visibleAddForm ? <span>Thêm</span> : <span> Đóng</span>}
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {
                        visibleAddForm ?
                            <Col className="card mb-3 m-auto p-3 no-gutters " md={8}>
                                <h6 className="d-flex justify-content-center mt-4">Thêm danh mục!</h6>

                                <Form noValidate validated={validated} onSubmit={handleAddCategory} method="post" >
                                    <Row className="mb-12">
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Tên danh mục</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                name="categoryName"

                                                maxLength='255'
                                            />
                                            <Form.Control.Feedback>Tốt!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="4">
                                            <Form.Label>Alias</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                name="alias"
                                                //onChange={handleChange}
                                                maxLength='100'
                                            />
                                            <Form.Control.Feedback>Tốt!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-12">
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Mô tả</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                name="description"
                                                //onChange={handleChange}
                                                maxLength='100'
                                            />
                                            <Form.Control.Feedback>Tốt!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" >
                                            <Form.Label>Danh mục</Form.Label>
                                            <Form.Select onChange={handleSelectType} defaultValue="Chọn chuyên mục sản phẩm" >
                                                {types.map(item => <option key={item.type_id} value={item.type_id}>{item.name} </option>

                                                )}
                                            </Form.Select>

                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Col md={1}>
                                            <Button type="submit" onClick={()=>setVisibleAddForm(false)} size="sm" variant="secondary" className='mt-3 ml-3'>Hủy</Button>
                                        </Col>
                                        <Col md={1}>
                                            <Button type="submit" size="sm" className='mt-3'>Thêm</Button>
                                        </Col>
                                        <Col />
                                    </Row>
                                   
                                </Form>
                            </Col>
                            : null}

                    {
                        visibleUpdateForm ?
                            <Col className="card mb-3 m-auto p-3 no-gutters " md={8}>
                                <h6 className="d-flex justify-content-center mt-4">Cập nhật danh mục!</h6>
                                <Col/>
                                <Form noValidate validated={validated} onSubmit={handleUpdateCategory} method="post" >
                                    <Row className="mb-12">
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Tên danh mục</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                name="categoryName"
                                                onChange={(e) => setDataUpdate({
                                                    ...dataUpdate,
                                                    name: e.target.value
                                                })}
                                                value={dataUpdate ? dataUpdate.name : ''}
                                                maxLength='255'
                                            />
                                            <Form.Control.Feedback>Tốt!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="4">
                                            <Form.Label>Alias</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                name="alias"
                                                onChange={(e) => setDataUpdate({
                                                    ...dataUpdate,
                                                    alias: e.target.value
                                                })}
                                                value={dataUpdate ? dataUpdate.alias : ''}
                                                maxLength='100'
                                            />
                                            <Form.Control.Feedback>Tốt!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-12">
                                        <Form.Group as={Col} md="6">
                                            <Form.Label>Mô tả</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                name="description"
                                                onChange={(e) => setDataUpdate({
                                                    ...dataUpdate,
                                                    description: e.target.value
                                                })}
                                                value={dataUpdate.description ? dataUpdate.description : ''}
                                                maxLength='100'
                                            />
                                            <Form.Control.Feedback>Tốt!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" >
                                            <Form.Label>Danh mục</Form.Label>
                                            <Form.Select onChange={handleSelectType} defaultValue="Chọn chuyên mục sản phẩm" >
                                                {types.map(item => <option key={item.type_id} value={item.type_id}>{item.name} </option>

                                                )}
                                            </Form.Select>

                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Col md={1}>
                                            <Button type="submit" onClick={()=>setVisibleUpdateForm(false)}  size="sm" variant="secondary" className='mt-3 ml-3'>Hủy</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="submit" size="sm" className='mt-3'>Cập nhật</Button>
                                        </Col>
                                        <Col />
                                    </Row>
                                </Form>
                            </Col>
                            : null}

                </Row>
                <Row>
                    <Col />
                    <Col md={10}>
                        <DataTable
                            title="Danh sách danh mục"
                            columns={columns}
                            data={categories}
                            pagination
                        />
                    </Col>
                    <Col />
                </Row>
            </Row>
            <Footer />
        </Container>
    )
}