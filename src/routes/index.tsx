import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Upload } from '../pages/Upload';
import { Tables } from '../pages/Tables';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/table" element={<Tables />} />
      </Routes>
    </BrowserRouter>
  );
}