import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { Routes , Route } from 'react-router-dom'
import Settings from '../components/Sidebar/Setting'


function Profile() {
  return (
    <div>
      <Sidebar/>
      <Routes>
        <Route path="/setting" element={<Settings/>} />
      </Routes>
      
    </div>
  )
}

export default Profile
