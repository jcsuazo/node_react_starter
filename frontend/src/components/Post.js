import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeAPost, retweetAPost } from '../actions/postActions';

const Post = ({ post, handeler, isModel = false, history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //HELPER
  function isRetweet(post) {
    return post.retweetData !== undefined;
  }

  // HANDELERS
  function likePostHandeler(PostId) {
    dispatch(likeAPost(PostId));
  }
  function retweetPostHandeler(post) {
    if (isRetweet(post)) {
      dispatch(retweetAPost(post.retweetData._id));
    } else {
      dispatch(retweetAPost(post._id));
    }
  }
  function postHandeler(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'A') {
      history.push(`/post/${post._id}`);
    }
  }

  return (
    <div className='post' key={post._id} onClick={(e) => postHandeler(e)}>
      <div className='postActionContainer'>
        {isRetweet(post) && (
          <span>
            <i className='fas fa-retweet'></i>
            Retweeted by{' '}
            <Link
              to={`/profile/${isRetweet(post) && post.postedBy.username}`}
              className='displayName'
            >
              @{post.postedBy.username}
            </Link>
          </span>
        )}
      </div>
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
          {post.replyTo && (
            <div className='replyFlag'>
              {post.replyTo.postedBy && (
                <>
                  <span>Replaying to </span>
                  <Link
                    to={`/profile/${post.replyTo.postedBy.username}`}
                    className='displayName'
                  >
                    @{post.replyTo.postedBy.username}
                  </Link>
                </>
              )}
            </div>
          )}
          <div className='postBody'>
            <span>
              {isRetweet(post) ? post.retweetData.content : post.content}
            </span>
          </div>
          {!isModel && (
            <div className='postFooter'>
              <div className='postButtonContainer'>
                <button
                  data-toggle='modal'
                  data-target='#replyModal'
                  onClick={() => handeler(post)}
                >
                  <i className='far fa-comment'></i>
                </button>
              </div>
              <div className='postButtonContainer green'>
                <button
                  onClick={() => retweetPostHandeler(post)}
                  className={`retweetButton ${
                    isRetweet(post)
                      ? post.retweetData.retweetUsers.includes(userInfo._id)
                        ? 'active'
                        : ''
                      : post.retweetUsers.includes(userInfo._id)
                      ? 'active'
                      : ''
                  }`}
                >
                  <i className='fas fa-retweet'></i>
                  <span>
                    {isRetweet(post)
                      ? post.retweetData.retweetUsers.length || ''
                      : post.retweetUsers.length || ''}
                  </span>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
