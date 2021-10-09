import { getProduct } from './AdminSlice';
import React, { useEffect} from 'react';
import { useDispatch } from 'react-redux';

export default function Dashboard() {
    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch])

    return (
            <h2 className = "d-flex justify-content-center mt-4">Chào mừng bạn đến Admin!</h2>
            )
}