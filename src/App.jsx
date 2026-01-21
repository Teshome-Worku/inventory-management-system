import { useState } from 'react';
import AddItem from './pages/AddItem'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './component/Sidebar';
import Dashboard from './pages/Dashboard';
import InventoryList from './pages/InventoryList';
import Reports from './pages/Reports';

function App() {
  return (
    <div>
    <BrowserRouter>
    <Sidebar/>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/addItem' element={<AddItem/>}/>
      <Route path='/inventory_list' element={<InventoryList/>}/>
      <Route path="/reports" element={<Reports/>}/>
      <Route path="/reports/:focus" element={<Reports/>}/>
    </Routes>
    
    </BrowserRouter>
   
    
    </div>
    
   
  )
}

export default App
