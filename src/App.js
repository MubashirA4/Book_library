import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookLibrary from './landingpage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookLibrary />} />
        {/* You can add more routes for other pages here */}
      </Routes>
    </Router>
  );
};

export default App;
