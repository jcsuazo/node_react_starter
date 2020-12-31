import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeAPost, retweetAPost, createAPost } from '../actions/postActions';
import { Button, Modal } from 'react-bootstrap';
const Post = ({ post, isModel = false, history }) => {
  const dispatch = useDispatch();

  const [modelContent, setModelContent] = useState('');
  const [show, setShow] = useState(false);
  const [modalPost, setmodalPost] = useState(null);

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

  const handleClose = () => {
    setShow(false);
    setmodalPost(null);
  };
  function toogleModal(post) {
    setmodalPost(post);
    setShow(true);
  }
  function submitHandler(e) {
    e.preventDefault();
    dispatch(createAPost({ content: modelContent, replyTo: modalPost._id }));
    handleClose();
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalPost && <Post post={modalPost} isModel={true} />}
            <div className='postFormContainer'>
              <div className='userImageContainer'>
                <img src={userInfo.profilePic} alt="User's profile" />
              </div>
              <div className='textareaContainer'>
                <textarea
                  id='replyTextarea'
                  placeholder="Wha's happening?"
                  onChange={(e) => setModelContent(e.target.value)}
                ></textarea>
                <div className='buttonsContainer'></div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button
              type='submit'
              id='submitReplyButton'
              style={{
                background: '#1fa2f1',
                border: 'none',
                borderRadius: '40px',
                padding: '7px 15px',
              }}
              disabled={modelContent.trim() === ''}
            >
              Reply
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

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
            {/* <img src={post.postedBy.profilePic} alt='profile' /> */}
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
                    onClick={() => toogleModal(post)}
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
    </>
  );
};

export default Post;
