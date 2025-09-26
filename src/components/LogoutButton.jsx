import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slice/authSlice';

const LogoutButton = ({username}) => {
  const dispatch = useDispatch();

  return (
    <nav className="flex  font-serif justify-between bg-violet-600 text-white py-5">
    <div className="logo">
<span className="font-bold text-xl mx-5"> Welcome, {username}!</span>
    </div>
    <button
      onClick={() => dispatch(logout())}
      className="cursor-pointer mx-10 border px-7 py-2 rounded-2xl hover:font-bold hover:border-2">
      Logout
    </button>
</nav>
  );
};

export default LogoutButton;
