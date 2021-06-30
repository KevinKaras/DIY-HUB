import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// WORK ON THIS TOMORROW


function UsersList() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    
  }, []);

  

  return (
    <>
    
    </>
  );
}

export default UsersList;





// async function fetchData() {
    //   const response = await fetch("/api/users/");
    //   const responseData = await response.json();
    //   setUsers(responseData.users);
    // }
    // fetchData();
    
    
    // const userComponents = users.map((user) => {
  //   return (
  //     <li key={user.id}>
  //       <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
  //     </li>
  //   );
  // });
  
  
  // <>
    //   <h1>A List Of My Clones: </h1>
    //   <ul>{userComponents}</ul>
    // </>