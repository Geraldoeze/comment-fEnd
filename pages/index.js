import { createContext, useContext } from "react";
import React, { useState, useEffect } from "react";


import { PostContext } from "../hook/context-hook";

import CommentList from "../component/comments/CommentsList";
import "../styles/home.module.css";
import "@fontsource/rubik";

import LoadingSpinner from "../component/UI/LoadingSpinner/LoadingSpinner";

import PostComment from "../component/comments/postComment";
import Modal from "../component/UI/Modal/Modal";

function Homepage({ currentUser, replies, comments }) {
  
  const [verify, setVerify] = useState(true);
  
  // LoadingSpinner and Modal
  const [showModal, setShowModal] = useState(false);
  const hideModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  const [comment, setComment] = useState(comments);
  const [replys, setReplys] = useState(replies);
  console.log(comments, currentUser, replies)
  
  return (
  
    <PostContext.Provider value={{ comment, setComment, replys, setReplys }}>
       <div>
         <Modal show={showModal}>
           {" "}
           <LoadingSpinner />
         </Modal>
         {!!comments && (
           <CommentList
             show={openModal}
             onClose={hideModal}
             creator={currentUser}
           />
          )}
         <PostComment
           show={openModal}
           onClose={hideModal}
           creator={currentUser}
         />
       </div>
    </PostContext.Provider>
  );
}

export default Homepage;

export async function getServerSideProps() {
  const comments = await fetch(`${process.env.BACKEND_URL}/com`,{
    method: "GET",
  });
  const com = await comments.json()
  const creator = await fetch(process.env.BACKEND_URL,{ method: "GET" });
  const create = await creator.json()
  const replies = await fetch(`${process.env.BACKEND_URL}/rep`,{
    method: "GET",
  });
  
  const rep = await replies.json()
  const resultComment = com.response
  const resultCreator = create.response
  const resultReply = rep.response
  return {
    props: {
      comments: resultComment,
      replies: resultReply,
      currentUser: resultCreator
    },
  };
}
