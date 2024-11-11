import React from "react";

import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import AddBookPage from "./pages/AddBookPage";
import FilterBookPage from "./pages/FilterBookPage";
import BookListPage from "./pages/BookListPage";
import ExportButtonPage from "./pages/ExportButtonPage";
import SettingPage from "./pages/SettingPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/add-book" element={<AddBookPage />} />
      <Route path="/filter-book" element={<FilterBookPage />} />
      <Route path="/book-list" element={<BookListPage />} />
      <Route path="/export" element={<ExportButtonPage />} />
      <Route path="/setting" element={<SettingPage />} />
    </Routes>

  );
};

export default App;
