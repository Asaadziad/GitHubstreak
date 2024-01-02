import React from "react";

export default function WelcomeCard() {
  return (
    <div className="bg-zinc-300 self-stretch flex flex-col items-stretch mt-4 pt-9 pb-8 px-3.5 rounded-xl m-5 shadow-xl" >
      <header className="text-black text-center text-4xl whitespace-nowrap " aria-label="Welcome message">
        Welcome to GitHubstreak
      </header>
    </div>
  );
}