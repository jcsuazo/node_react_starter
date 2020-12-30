import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { useDispatch } from 'react-redux';
const SideBar = ({ history }) => {
  const dispatch = useDispatch();
  //HANDLERS
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/login');
  };
  return (
    <nav>
      <Link to='/'>
        <i className='fas fa-dove'></i>
      </Link>
      <Link to='/'>
        <i className='fas fa-home'></i>
      </Link>
      <Link to='/'>
        <i className='fas fa-search'></i>
      </Link>
      <Link to='/'>
        <i className='fas fa-bell'></i>
      </Link>
      <Link to='/'>
        <i className='fas fa-envelope'></i>
      </Link>
      <Link to='/'>
        <i className='fas fa-user'></i>
      </Link>
      <Link to='/login' onClick={logoutHandler}>
        <i className='fas fa-sign-out-alt'></i>
      </Link>
    </nav>
  );
};

export default SideBar;
