import {  Button } from 'react-bootstrap';
import AdminNav from '../../components/AdminNav';
import { selectProducts, getProduct,  removeProduct, remove } from './AdminSlice';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';

export default function ProductTable() {
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);


    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

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
    ];

   
    
   console.log(products);
    return (
        <div className="container">
            <AdminNav />

            <DataTable name='product-table'
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