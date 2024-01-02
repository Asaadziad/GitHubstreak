 import supabase from "../supabase/supabaseClient"

 export async function signInWithGithub() {
     const { data, error } = await supabase.auth.signInWithOAuth({
       provider: 'github',
     })
     if(error) {
         console.log(error);
     }
     if(data) {
         console.log(data);   
     }
 }

 export async function signOut() {
     const { error } = await supabase.auth.signOut();
     if(error) {
         console.log(error);
     }
 }