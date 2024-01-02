 const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

 const year = 2024;
 const year_start = `${year}-01-01T00:00:00Z`;
 const year_end = `${year}-12-31T23:59:59Z`;
 const now = new Date();
 const today = now.toISOString().split('T')[0];
 const tomorrowDate = new Date(today);
 tomorrowDate.setDate(tomorrowDate.getDate() + 1);


 const query = `
 query($userName:String!) {
   user(login: $userName){
     contributionsCollection(from: "${year_start}", to: "${year_end}") {
       contributionCalendar {
         totalContributions
         weeks {
           contributionDays {
             contributionCount
             date
           }
         }
       }
     }
   }
 }
 `;

 export default async function retrieveContributionData(userName) {
   const variables = `
   {
     "userName": "${userName}"
   }
 `
   const body = {
     query,
     variables
   }   
   const result = fetch('https://api.github.com/graphql', {
     method: 'POST',
     headers: {
      Authorization: `Bearer ${TOKEN}`,
     },
     body: JSON.stringify(body)
   }).then((res) => {
     return res.json();
   }).then(data => {
   
       const { data: { user: { contributionsCollection: { contributionCalendar: { totalContributions, weeks }} }} } = data;
     let contributionDays = weeks.reduce(((prev, cur) => {
       return prev.concat(cur.contributionDays)
     }),[]);
    
     contributionDays = contributionDays.filter((c) => {
       if(c.date <= today) return true;
       return false;
     });
     return contributionDays;
   }).catch(err => console.log(err));

   return result;
}

 /* 
 * @param : contributionDays - array of contributionDays contributionDays {
 *                                                         contributionCount
 *                                                         date
 *                                                         }
 */
 export function flattenGraph(contributionDays) {
   const contributions = {};
   for(const contributionDay in contributionDays) {
    
     contributions[contributionDays[contributionDay].date] = contributionDays[contributionDay].contributionCount;
   }
   return contributions;
 }

 export async function calculateStreak(arrayOfContributions) {
  

   const contributions = flattenGraph(arrayOfContributions);
  
   const todayDate = arrayOfContributions.at(-1).date;
   const firstDate = arrayOfContributions[0].date;

   const streak = {
    totalContributions: 0,
     firstContribution: '',
     currentStreak: {
       start: firstDate,
       end: firstDate,
       days: 0,
     },
   }
  
   for (const contributionDate in contributions) {
     const contributionCount = contributions[contributionDate];
    
    streak.totalContributions += contributionCount;

     if(contributionCount > 0){
       streak.currentStreak.days++;
       streak.currentStreak.end = contributionDate;

       if(streak.currentStreak.days === 1){
         streak.currentStreak.start = contributionDate;
       }

       // first date is the first contribution
       if (streak.firstContribution.length <= 0) {
         streak.firstContribution = contributionDate;
       }
     } else if (contributionDate !== todayDate) {
       // reset streak
       streak.currentStreak.days = 0;
       streak.currentStreak.start = todayDate;
       streak.currentStreak.end = todayDate;
     }

   }

   return streak;
 }

 export async function checkUser(userName) {
   const response = await (await fetch(`https://api.github.com/users/${userName}`)).json();
   if(response.message && response.message === "Not Found"){
     return false;
   }
   return true;
 }