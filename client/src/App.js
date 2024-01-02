import React, { useEffect } from 'react'
import {useState} from 'react'
import UserTable from './components/UserTable';
import Navbar from './components/Navbar';
import Card from './components/Card.js';
import Signup from './components/Signup';

export default function App() {
  const [userCount , setUserCount] = useState(0);
  useEffect(() => {
    localStorage.setItem('cacheUsers', JSON.stringify([]));
  }, []);
  return (
    <main>
    <Navbar/> 
    <Card/>
    {/* <Header/> */}
    <Signup userCount={userCount} setUserCount={setUserCount}/>
    <UserTable userCount={userCount}/>
    </main>
  )
}
