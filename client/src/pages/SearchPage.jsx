import React from 'react';
import ReactDOM from 'react-dom';
import Logo from "../components/Logo.jsx";
import DisplayPosts from '../components/DisplayPosts.jsx';
import './PostPage.css'
import { useState } from 'react'
import './SearchPage.css'
export default function Search ({
  posts
}){
  const [searchBarText, setSearchBarText] = useState("");
  function handleSearchBarChange(e) {
    setSearchBarText(e.target.value);
  }
  return (
    <>
      <div className='page'>
        <center><h1>Search page</h1></center>
        <input
          onChange={handleSearchBarChange}
          value={searchBarText}
          className="search-bar"
        >
        </input>
        <DisplayPosts posts={posts}/>
      </div>
    </>
  )
}


