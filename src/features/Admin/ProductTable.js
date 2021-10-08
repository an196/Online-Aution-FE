import { Table, Button } from 'react-bootstrap';
import AdminNav from '../../components/AdminNav';
import { selectProducts, getProduct } from './AdminSlice';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import {FaTrashAlt} from 'react-icons/fa';


export default function Dashboard() {
    const products = useSelector(selectProducts);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();


    const columns = React.useMemo(
        () => [
            {
                Header: '#',
                accessor: 'product_id', // accessor is the "key" in the data
            },
            {
                Header: 'Tên sản phẩm',
                accessor: 'name',
            },
            {
                Header: 'Người bán',
                accessor: 'seller_name',
            },
            {
                Header: 'Ngày tạo',
                accessor: 'created_at',
            },
            {
                Header: 'Danh mục',
                accessor: 'type_name',
            },
            {
                Header: 'Gỡ',
                id: 'delete',
                accessor: (str) => 'delete',
                Cell: (tableProps) => (
                    <span style={{cursor:'pointer',color:'blue',textDecoration:'underline'}}
                      onClick={() => {
                        // ES6 Syntax use the rvalue if your data is an array.
                        // const dataCopy = [...data];
                        // // It should not matter what you name tableProps. It made the most sense to me.
                        // dataCopy.splice(tableProps.row.index, 1);
                        // setData(dataCopy);
                        console.log(tableProps.row.cells[0].value)
                      }}>
                     <FaTrashAlt style={{color:'red'}}/>
                    </span>
                  ),
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 2 },
        },
        usePagination
    )


    useEffect(() => {
        dispatch(getProduct());
        setData(products);
    }, [dispatch])

    console.log(products);



    return (
        <div className="container">
            <AdminNav />
            <>
                <Table {...getTableProps()} striped bordered hover >
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <div className="pagination">
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>{' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>{' '}
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </>

        </div>
    )
}