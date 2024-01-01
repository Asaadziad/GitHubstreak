import React from 'react'
import {useState} from 'react'
import UserTable from './components/UserTable';
import Header from './components/Header';
import Signup from './components/Signup';

export default function App() {
  const [userCount , setUserCount] = useState(0);
  return (
    <main>
    <Header/>
    <Signup userCount={userCount} setUserCount={setUserCount}/>
    <UserTable userCount={userCount}/>
    </main>
  )
}
