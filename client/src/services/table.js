import supabase from '../supabase/supabaseClient';
import retrieveContributionData, { calculateStreak } from "./github"


function cmp(a,b) {
    return a < b ? 1 : -1;
}
// Compare function to sort users by current streak
function compare(a, b) { 
    if(a.currentStreak === b.currentStreak) return cmp(a.totalContributions,b.totalContributions); 
    return cmp(a.currentStreak,b.currentStreak); 
}


const fetchUsersData = async (setLoading, setUserData) => {
    const t0 = performance.now();
    setLoading(true);

    let { data, error } =  await supabase.from('Users').select('userName');
    
    let users_to_fetch =   [];
    let c =                localStorage.getItem('cacheUsers');
    let cache =            c ? JSON.parse(c) : [];  
    
    // remove cached users
    users_to_fetch = data.filter((user) => {
        for(const u in cache) {
          if(cache[u].userName === user.userName) return false;
        }
        return true;
    });

    // fetch new users data
    if(users_to_fetch.length > 0){
      
      let fetch_promises = []; 
      
      // Add all "user contribution fetching request" promises needed to one array
      for (const user in users_to_fetch) {
        fetch_promises.push(retrieveContributionData(users_to_fetch[user].userName));
      }
      
      
      // Resolve all promises in parallel using the Promise api call all([...])
      let result = await Promise.all(fetch_promises);
      
      // Cache all users objects
      for(const user in users_to_fetch){
        let streak = calculateStreak(result[user]);
        const current_user = {
          userName: users_to_fetch[user].userName,
          currentStreak: streak.currentStreak.days,
          totalContributions: streak.totalContributions,
        }
        const update_result = await supabase.from('Users').update({ currentStreak: current_user.currentStreak, totalContributions: current_user.totalContributions}).ilike('userName', `%${current_user.userName}%`).select();
        if(update_result) {
          if(update_result.error) {
            console.log(update_result.error); 
          }
        }
        cache.push(current_user);
       } 
    }

    if(error) {
      console.log(error);
    }  

    
    setLoading(false);
    cache.sort(compare);
    localStorage.setItem('cacheUsers', JSON.stringify(cache));
    setUserData(cache);
    const t1 = performance.now();
    console.log(t1-t0, 'ms');
}

export default fetchUsersData;