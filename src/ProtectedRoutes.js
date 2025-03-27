import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../src/store/slice/authSlice';
import { fetchAllUsers } from '../src/store/slice/userSlice';
import { fetchAllBorrowedBooks, fetchUserBorrowedBooks } from '../src/store/slice/borrowSlice';

const ProtectedRoutes = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  useEffect(() => {
    dispatch(getUser());

    if (!isAuthenticated) {
      navigate("/login", { replace: true }); // ✅ Redirect to login
    }

    if (isAuthenticated && user?.role === "user") {
      dispatch(fetchUserBorrowedBooks());
    }
    if (isAuthenticated && user?.role === "Admin") {
      dispatch(fetchAllUsers());
      dispatch(fetchAllBorrowedBooks());
    }
  }, []);

  return null;
};

export default ProtectedRoutes;
