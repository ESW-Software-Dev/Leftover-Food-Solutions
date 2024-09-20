import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import PostFood from './components/PostForm';
import SearchFood from './pages/SearchFood';

const PageRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/post-food" element={<PostFood />} />
    <Route path="/search-food" element={<SearchFood />} />
  </Routes>
);

export default PageRouter;


