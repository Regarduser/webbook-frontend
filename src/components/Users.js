import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../layout/Header";
import { banUser, deleteUser, getUser } from "../store/slice/authSlice";
import { fetchAllUsers } from "../store/slice/userSlice";

const Users = () => {
  const dispatch = useDispatch()
const { users } = useSelector((state) => state.user);
const { user, isAuthenticated } = useSelector((state) => state.auth);
  const formateDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const FormattedDate = `${String(date.getDate()).padStart(2, 0)} - ${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getFullYear())}`;
    const FormattedTime = `${String(date.getHours()).padStart(2, 0)} : ${String(
      date.getMinutes()
    ).padStart(2, "0")} : ${String(date.getSeconds()).padStart(2, "0")}`;

    const result = `${FormattedDate} ${FormattedTime}`;
    return result;
  };


const handleDeleteUser = async(email) => {
  await dispatch(deleteUser(email));
  dispatch(fetchAllUsers())
  dispatch(getUser())

}

const handleban = async(email) => {
  await dispatch(banUser(email));
  dispatch(fetchAllUsers())
  dispatch(getUser())

}

  useEffect(()=>{
            dispatch(fetchAllUsers())
  },[dispatch])

  return (
    <>
      <div className="sidecontainer Users-container">
        <Header />
        <header className="users-header">
          <h1 className="user-header text-center">Registered Users and Admin</h1>
          </header>
        {/* table */}

        {users && users.filter((u) => u.role === "user" || "Admin").length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead className="thead"> 
                <tr className="bg-gray">
                  <th className="table-head">ID</th>
                  <th className="table-head">Name</th>
                  <th className="table-head">Email</th>
                  <th className="table-head text-center">Role</th>
                  {  isAuthenticated && user.role === "Admin" && (
                  <th className="table-head text-center">Delete</th>

                  )}
                  <th className="table-head text-center">Status</th>
                  <th className="table-head text-center">Register on</th>
                </tr>
              </thead>
              <tbody>
                {
                    users.filter(u=>u.role === "user" || "Admin").map((user, index)=>(
                        <tr key={user._id} className={(index+1) % 2 === 0 ? "bg-gray" : "" } >
                           <td className="table-head">{index+1}</td> 
                           <td className="table-head">{user.name}</td> 
                           <td className="table-head">{user.email}</td> 
                           <td className="table-head text-center">{user.role}</td> 
                           {  isAuthenticated && user.role === "user" && (
                           <td className="table-head text-center">
                        <i className="fa-solid fa-trash-can cursor-pointer "  onClick={()=>handleDeleteUser(user.email)}></i>
                        </td> 
                      )}
                         {  isAuthenticated && user.role === "Admin" && (

                           <td className="table-head text-center">{"admin"}</td> 
                         )}
                           <td className="table-head text-center">{user.isBanned? (<i className="fa-solid fa-ban" onClick={()=>handleban(user.email)}></i>) : (<i className="fa-solid fa-key" onClick={()=>handleban(user.email)}></i>)}</td> 
                           <td className="table-head text-center">{formateDate(user.createdAt)}</td> 
                        </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        ) : (
           <h3 className="user-header table-message">No Register Users found in library</h3>
        )}
      


      </div>
    </>
  );
};

export default Users;
