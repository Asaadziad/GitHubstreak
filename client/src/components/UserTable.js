import React from 'react'
import {useEffect,useState} from 'react'
import Table from './Table';
import fetchUsersData from '../services/table';
import Spinner from './Spinner';

export default function UserTable({userCount}) {
  const [loading, setLoading]   =   useState(false);
  const [userData, setUserData] = useState(null);
  useEffect( () => {
    fetchUsersData(setLoading, setUserData);
  }, [userCount]);
  return (
    <>
    { loading ? (<Spinner />) : (<Table userData={userData} />)}
    </>
    )
}
