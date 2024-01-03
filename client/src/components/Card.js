import React from "react";

export default function WelcomeCard() {
  return (
    <header className="bg-zinc-300 self-stretch flex flex-col items-stretch mt-4 pt-9 pb-8 px-3.5 rounded-xl m-5 shadow-xl" >
      <div className="text-black text-center text-3xl whitespace-nowrap " aria-label="Welcome message">
        Welcome to Githubstreak 
      </div>
    </header>
  );
}