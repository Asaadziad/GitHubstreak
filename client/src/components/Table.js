import React from 'react'

export default function Table({ userData }) {
  return (
    <table id="leaderboard">
        <tbody>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Streak Count</th>
          <th>Total Contributions</th>
          <th>Github Profile</th>
        </tr>
        
        {userData && userData.map((user,i) => (
          <tr key={i}>
          <td>{i + 1}</td>
          <td>{user.userName}</td>
          <td>{user.currentStreak}</td>
          <td>{user.totalContributions}</td>
          <td><a href={`https://github.com/${user.userName}`}>Link</a></td>
          </tr>
        ))}
        
        
      </tbody>
    </table>
  )
}
