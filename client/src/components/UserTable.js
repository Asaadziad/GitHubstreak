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
      className='spinner'
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg">
        <g className="spinner_Wezc"><circle cx="12" cy="2.5" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/></g></svg>) : (
    <Table userData={userData} />
  )}
  </>)
}
