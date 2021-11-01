import {  Nav, Navbar,Table,Button } from 'react-bootstrap';
import { FaUser, FaRegTrashAlt, FaPencilAlt} from 'react-icons/fa';
import AdminNav from '../../components/AdminNav';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { NotifyHelper } from '../../helper/NotifyHelper';
import DataTable  from 'react-data-table-component';

export default function CategoryTable() {
    const [categories,setCategories] = useState();
    const [reload, setReload] = useState(false);
   

    //call api ------------------------------------------------------------------------------------------------->
    function getCategories() {
        let headers = {};
        headers['x-access-token'] = localStorage.x_accessToken ? localStorage.x_accessToken : null;
        headers['x-refresh-token'] = localStorage.x_refreshToken ? localStorage.x_refreshToken : null;

        let config = {
            headers: { ...headers }
        }

        axios
            .get(`http://localhost:3002/api/admin/category`,  config)
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

    function deleteCategory(id) {
        
        let headers = {};
        headers['x-access-token'] = localStorage.x_accessToken ? localStorage.x_accessToken : null;
        headers['x-refresh-token'] = localStorage.x_refreshToken ? localStorage.x_refreshToken : null;

        let config = {
            headers: { ...headers }
        }

        axios
            .delete(`http://localhost:3002/api/admin/category?category_id=${id}`,  config)
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
    const columns=[
        {
            cell: (row) => <button onClick={()=>clickHandler(row.category_id)}>Xóa</button>,
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
            name: 'Loại danh mục',
            selector: row => row.type_name,
        },
    ];

    //hanldle -------------------------------------------------------------------------------------------------------->
    function clickHandler(e){
        deleteCategory(e);
    }

    //effect --------------------------------------------------------------------------------------------------------->
    useEffect(() => {
        getCategories();
    }, [reload]);

    useEffect(() => {
    }, [categories]);

    console.log(categories)
    return (
        <div className="container">
            <AdminNav/>
            <Button className="m-2" variant="outline-success">Thêm</Button>
            <DataTable
                title="Danh sách danh mục"
                columns={columns}
                data={categories}
                //selectableRows
                //clearSelectedRows={toggleCleared}
                pagination
            />
        </div>
    )
}