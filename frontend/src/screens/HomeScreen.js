import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import Meta from '../components/Meta';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch, keyword, pageNumber]);

  function showProducts() {
    return (
      <>
        <Row>
          <h1>Home</h1>
        </Row>
      </>
    );
  }
  return (
    <>
      <Meta />
      {!keyword ? (
        showProducts()
      ) : (
        <Link to='/' className='btn btn-light'>
          Go back
        </Link>
      )}
    </>
  );
};

export default HomeScreen;
