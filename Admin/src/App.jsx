import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Order/Order'
import Edit from './pages/Edit/Edit'
const App = () => {
  return (
    <>
      <div className="app">
        <Navbar />
        <div className="app-container">
          <Sidebar />
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/edit" element={<Edit />} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />

    </>
  )
}

export default App
