import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import Meta from '../components/Meta';
import SideBar from '../components/SideBar';
import CreatePostForm from '../components/CreatePostForm';
import { listAllPosts } from '../actions/postActions';
import ListPosts from '../components/ListPosts';
import Loader from '../components/Loader';
const HomeScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const keyword = match.params.keyword;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const listPosts = useSelector((state) => state.listPosts);
  const { loading: loadingPosts, posts } = listPosts;

  const createPost = useSelector((state) => state.createPost);
  const { post } = createPost;

  const likePost = useSelector((state) => state.likePost);
  const { likedPost } = likePost;

  const retweetedPost = useSelector((state) => state.retweetedPost);
  const { retweetePost } = retweetedPost;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    dispatch(listAllPosts());
  }, [dispatch, history, userInfo, post, likedPost, retweetePost]);

  function showProducts() {
    return (
      <div className='wrapper'>
        <div className='row row-full'>
          <div className='col-2'>
            <SideBar history={history} />
          </div>
          <div className='mainSectionContainer col-10 col-md-8 col-lg-6'>
            <div className='titleContainer'>
              <h1>Home</h1>
            </div>
            {userInfo && <CreatePostForm userLoggedIn={userInfo} />}
            {loadingPosts ? <Loader /> : <ListPosts posts={posts} />}
          </div>
          <div className='d-none d-md-block col-md-2 col-lg-4 bg-info'>
            <p>third column</p>
          </div>
        </div>
      </div>
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
