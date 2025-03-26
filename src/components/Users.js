import React from "react";
import { useSelector } from "react-redux";
import Header from "../layout/Header";

const Users = () => {
const { users } = useSelector((state) => state.user);
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

  return (
    <>
      <div className="sidecontainer Users-container">
        <Header />
        <header className="users-header">
          <h1 className="user-header">Registered Users</h1>
          </header>
        {/* table */}

        {users && users.filter((u) => u.role === "user").length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead className="thead"> 
                <tr className="bg-gray">
                  <th className="table-head">ID</th>
                  <th className="table-head">Name</th>
                  <th className="table-head">Email</th>
                  <th className="table-head text-center">Role</th>
                  <th className="table-head text-center">Status</th>
                  <th className="table-head text-center">Register on</th>
                </tr>
              </thead>
              <tbody>
                {
                    users.filter(u=>u.role === "user").map((user, index)=>(
                        <tr key={user._id} className={(index+1) % 2 === 0 ? "bg-gray" : "" } >
                           <td className="table-head">{index+1}</td> 
                           <td className="table-head">{user.name}</td> 
                           <td className="table-head">{user.email}</td> 
                           <td className="table-head text-center">{user.role}</td> 
                           <td className="table-head text-center">{user? "unban" : "ban"}</td> 
                           <td className="table-head">{formateDate(user.createdAt)}</td> 
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
