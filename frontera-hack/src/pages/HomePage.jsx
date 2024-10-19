import React from "react";
import supabase from "../config/supabase";
import { useEffect, useState } from "react";

const HomePage = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.warn(sessionError);
        return;
      }
      if (session) {
        setUser(session);
        console.log(session);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    console.log("Trying");
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error);
    }
  }

  return (
    <>
      {
        user
        ?
        <h1>Hello {user.token_type}</h1>
        :
        <h1>error</h1>
      }
      <button onClick={handleLogout}>
        Log Out
      </button>
    </>
  );
}

export default HomePage;