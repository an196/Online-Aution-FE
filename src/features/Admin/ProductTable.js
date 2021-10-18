import { Button } from 'react-bootstrap';
import AdminNav from '../../components/AdminNav';
import { selectProducts, getProduct, removeProduct, remove } from './AdminSlice';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect,useState } from 'react';
import DataTable from 'react-data-table-component';
import { BsFillTrashFill } from 'react-icons/bs';
import axios from 'axios';
import { NotifyHelper } from '../../helper/NotifyHelper';

export default function ProductTable() {
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);


    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);


    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
                setToggleCleared(!toggleCleared);
                const id = selectedRows[0].product_id;
                dispatch(removeProduct(id));
                //dispatch(remove(id));
            }
        };

        return (
            <Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
                Gỡ sản phẩm
            </Button>
        );
    }, [products, selectedRows, toggleCleared]);

    const columns = [
        {
            name: 'id',
            selector: row => row.product_id,
            sortable: true,
        },
        {
            name: 'Tên sản phẩm',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Người bán',
            selector: row => row.seller_name,
        },
        {
            name: 'Ngày tạo',
            selector: row => row.created_at,
            sortable: true,
        },
        {
            name: 'Danh mục',
            selector: row => row.type_name,
            sortable: true,
        },
        {
            cell: (row) => (<Button size="small" variant='danger'  onClick={() => handleDelete(row.product_id)} ><BsFillTrashFill /></Button>),
           
            button: true,
        },
    ];

    function handleDelete(id) {
        console.log(id)
        const data = {};

        let headers = {};
        headers['x-access-token'] = localStorage.x_accessToken ? localStorage.x_accessToken : null;
        headers['x-refresh-token'] = localStorage.x_refreshToken ? localStorage.x_refreshToken : null;

        let config = {
            headers: { ...headers}
        }
       
        axios
            .patch(`http://localhost:3002/api/admin/product/removeProduct?id=${id}`,data, config)
            .then(function (res) {
                console.log(res)
                if (res.status === 200){
                    NotifyHelper.success(res.data.message, "Thông báo")
                    dispatch(remove(id))
                }
                    

            })
            .catch(function (error) {
                NotifyHelper.error(error, "Thông báo");
                console.log(error)
            });
        
       
    }

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);


    return (
        <div className="container">
            <AdminNav />
            <DataTable name='product-table'
                title="Danh sách các sản phẩm"
                columns={columns}
                data={products}
                //selectableRows
                contextActions={contextActions}
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={toggleCleared}
                pagination
            />
        </div>

    )
}