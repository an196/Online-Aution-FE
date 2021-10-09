import { Table, Button } from 'react-bootstrap';
import AdminNav from '../../components/AdminNav';
import { selectProducts, getProduct, selectRemoveResult, removeProduct, remove } from './AdminSlice';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { NotifyHelper } from '../../helper/NotifyHelper';
import { useHistory } from 'react-router';

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
                dispatch(remove(id));
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
            name: '#',
            selector: row => row.product_id,
        },
        {
            name: 'Tên sản phẩm',
            selector: row => row.name,
        },
        {
            name: 'Người bán',
            selector: row => row.seller_name,
        },
        {
            name: 'Ngày tạo',
            selector: row => row.created_at,
        },
        {
            name: 'Danh mục',
            selector: row => row.type_name,
        },
    ];

   
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);
   
    return (
        <div className="container">
            <AdminNav />

            <DataTable
                title="Danh sách các sản phẩm"
                columns={columns}
                data={products}
                selectableRows
                contextActions={contextActions}
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={toggleCleared}
                pagination

            />
           
        </div>

    )
}