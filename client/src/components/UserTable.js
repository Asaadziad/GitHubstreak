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
    const t0 = performance.now();
    let {data,error} = await supabase.from('Users').select('userName');
    let users_to_fetch = [];
    let c = localStorage.getItem('cacheUsers');
    let cache =  c ? JSON.parse(c) : [];  
    if(data) {
      users_to_fetch = data.filter((user) => {
        for(const u in cache) {
          if(cache[u].userName === user.userName) return false;
        }
        return true;
      });
    }
    if(users_to_fetch.length > 0){
      let fetch_promises = [];
      for (const user in users_to_fetch) {
        fetch_promises.push(retrieveContributionData(users_to_fetch[user].userName));
      }
      let result = await Promise.all(fetch_promises);
      for(const user in users_to_fetch){
        //let result = await retrieveContributionData(users_to_fetch[user].userName);
        let streak = calculateStreak(result[user]);
        const current_user = {
          userName: users_to_fetch[user].userName,
          currentStreak: streak.currentStreak.days,
        }
        cache.push(current_user);
      }
      function compare(a, b) { return a.currentStreak === b.currentStreak ? 0 : a.currentStreak < b.currentStreak ? 1 : -1;}
      cache.sort(compare);
      setUserData(cache);
      localStorage.setItem('cacheUsers', JSON.stringify(cache));
    }
    if(error) {
      console.log(error);
    }  
    const t1 = performance.now();
    console.log(t1-t0, 'ms');
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
