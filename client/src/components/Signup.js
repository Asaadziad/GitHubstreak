import React, { useState } from 'react'
import { useFormik } from "formik";
import { checkUser } from '../services/github'
import supabase from '../supabase/supabaseClient';

export default function Signup({userCount, setUserCount}) {
  const [errorState, setErrorState] = useState("");
  let formik = useFormik({
    initialValues: { userName: "" },
    onSubmit: (user) => {
      
      checkOnSignup(user.userName);
    },
  });
  async function checkOnSignup(userName){
    if(userName === "") return;
    let valid_user = await checkUser(userName);
    if(valid_user) {
      const {data, error} = await supabase.from('Users').select('*').ilike('userName', `%${userName}%`);
      if(data){
        if(data.length > 0){
          setErrorState("User already exists");
        }
        if(data.length === 0) {
          const {data, error} = await supabase.from('Users').insert({ userName: userName }).select();
          if(data){
            console.log("Success");
          }
          if(error){
            console.log(error);
          }
          
        }
      }
      if(error){ // user not found
        console.log("User doesnt exist")
      }
    } else {
      setErrorState("Username is not valid");
    }
    setUserCount(userCount + 1);
  }
  return (
    <div>
            <p>Add your name to the leaderboard</p>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor='username'>Enter your Github Username:
                <input type="text"
                id="userName"
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                 />
              </label>
              {formik.touched.name && formik.errors.name && (
                <p >{formik.errors.name}</p>
              )}
            <button type="submit" disabled={!formik.dirty || !formik.isValid}> Signup </button>
            </form>
        {errorState && (<p >{errorState}</p>)}
    </div>
  )
}
