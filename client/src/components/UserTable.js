import React from 'react'
import {useEffect,useState} from 'react'
import supabase from '../supabase/supabaseClient';
import retrieveContributionData, { calculateStreak } from "../services/github"
import Table from './Table';

export default function UserTable({userCount}) {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
   async function fetchData(){
    setLoading(true);
    let {data,error} = await supabase.from('Users').select('userName');
    let users_arr = [];
    if(data){
      for(const user in data){
        let result = await retrieveContributionData(data[user].userName);
        let streak = await calculateStreak(result);
        const current_user = {
          userName: data[user].userName,
          currentStreak: streak.currentStreak.days,
        }
        users_arr.push(current_user);
        users_arr.sort((a,b) => {
          return a.currentStreak < b.currentStreak;
        });
      }
    }
    if(error) {
      console.log(error);
    }  
    
    setUserData(users_arr);
    setLoading(false);
   }
   
   fetchData();

  },[userCount]);
  return (
    <>{ loading ? (<svg 
      className="spinner_P7sC"
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg">
        <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" />
        </svg>) : (
    <Table userData={userData} />
  )}
  </>)
}
