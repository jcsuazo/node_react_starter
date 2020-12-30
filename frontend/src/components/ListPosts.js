import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeAPost } from '../actions/postActions';
const ListPosts = ({ posts }) => {
  const dispatch = useDispatch();
  let retweetText = '';
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // HANDELERS
  function likePostHandeler(PostId) {
    dispatch(likeAPost(PostId));
  }
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div className='post' key={post._id}>
            <div className='postActionContainer'>{retweetText}</div>
            <div className='mainContentContainer'>
              <div className='userImageContainer'>
                <img src={post.postedBy.profilePic} alt='profile' />
              </div>
              <div className='postContenteContainer'>
                <div className='header'>
                  <Link
                    to={`/profile/${post.postedBy.username}`}
                    className='displayName'
                  >
                    {post.postedBy.firstName} {post.postedBy.lastName}
                  </Link>
                  <span className='username'>@{post.postedBy.username}</span>
                  <span className='date'>{post.createdAt}</span>
                </div>
                <div className='postBody'>
                  <span>{post.content}</span>
                </div>
                <div className='postFooter'>
                  <div className='postButtonContainer'>
                    <button data-toggle='modal' data-target='#replyModal'>
                      <i className='far fa-comment'></i>
                    </button>
                  </div>
                  <div className='postButtonContainer green'>
                    <button
                      className={`retweetButton ${
                        post.retweetUsers.includes(userInfo._id) ? 'active' : ''
                      }`}
                    >
                      <i className='fas fa-retweet'></i>
                      <span>{post.retweetUsers.length || ''}</span>
                    </button>
                  </div>
                  <div className='postButtonContainer red'>
                    <button
                      onClick={() => likePostHandeler(post._id)}
                      className={`likeButton ${
                        post.likes.includes(userInfo._id) ? 'active' : ''
                      }`}
                    >
                      <i className='far fa-heart'></i>
                      <span>{post.likes.length || ''}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ListPosts;
