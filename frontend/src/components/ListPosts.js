import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import Post from '../components/Post';
import { createAPost } from '../actions/postActions';
const ListPosts = ({ posts }) => {
  const dispatch = useDispatch();

  const [modelContent, setModelContent] = useState('');
  const [show, setShow] = useState(false);
  const [modalPost, setmodalPost] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // HANDELERS
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
      {posts &&
        posts.map((post) => (
          <Post key={post._id} post={post} handeler={toogleModal} />
        ))}
    </>
  );
};

export default ListPosts;
