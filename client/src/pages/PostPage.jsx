import React from 'react';
import ReactDOM from 'react-dom';
import Logo from "../components/Logo.jsx";
import AddPostSection from '../components/Posts/AddPostSection.jsx';
import {useState} from 'react'
import './PostPage.css'
import DisplayPosts from '../components/DisplayPosts.jsx';
export default function PostPage ({
  posts,
  addPost,
  user
})  {
  const [isPostSectionOpen, setIsPostSectionOpen] = useState(false);

  function userPosts(){
    return posts.filter((post) => post.netid == user.netid)
  }

  return (
    <>
      <center className='page'>
        <div className='horizontal'>
        <h1>{userPosts().length > 0 ? 'Your Posts' : 'No Posts'}</h1>
          <button 
            className='addpost-toggle'
            onClick={() => setIsPostSectionOpen(!isPostSectionOpen)}>
              {isPostSectionOpen ? '-' : '+'}
          </button>
        </div>

        <AddPostSection
          posts={posts}
          AddPost={addPost}
          isOpen = {isPostSectionOpen}
          setPostSection={setIsPostSectionOpen}
        />
        <DisplayPosts posts={userPosts()}/>
        
      </center>
    </>
  )
}

