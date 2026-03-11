import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/ViewUser.css";

function ViewUser() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [user,setUser] = useState<any>(null);

  useEffect(()=>{

    fetch(`http://localhost:3002/api/users/${id}`)
    .then(res=>res.json())
    .then(data=>setUser(data));

  },[id]);

  if(!user) return <div className="loading">Loading...</div>;

  return(

  <div className="view-page">



    <header className="view-header">

      <div className="header-inner">

        <button
          className="back-btn"
          onClick={()=>navigate("/")}
        >
          ← Back to Users
        </button>

        <span className="user-id">
          ID: {id}
        </span>

      </div>

    </header>


    <main className="view-main">

      <div className="page-title">

        <h1>User Details</h1>
        <p>View user account information.</p>

      </div>


      <div className="profile-card">

        <div className="profile-row">

          <div className="avatar">

            <span>
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </span>

          </div>

          <div className="profile-info">

            <h2>
              {user.firstName} {user.lastName}
            </h2>

            <span
              className={
                user.status === "Inactive"
                ? "status-inactive"
                : "status-active"
              }
            >
              {user.status || "Active"}
            </span>

          </div>

        </div>

      </div>




      <div className="info-card">

        <div className="info-grid">

          <div>
            <label>Email</label>
            <p>{user.email}</p>
          </div>

          <div>
            <label>Mobile</label>
            <p>{user.mobile}</p>
          </div>

          <div>
            <label>Gender</label>
            <p>{user.gender}</p>
          </div>

          <div>
            <label>Status</label>
            <p>{user.status}</p>
          </div>

          <div className="full">
            <label>Location</label>
            <p>{user.location}</p>
          </div>

        </div>

      </div>


 

      <div className="view-actions">

        <button
          className="edit-btn"
          onClick={()=>navigate(`/edit-user/${id}`)}
        >
          Edit User
        </button>

        <button
          className="back-btn-2"
          onClick={()=>navigate("/")}
        >
          Back to Users
        </button>

      </div>


    </main>

  </div>

  );

}

export default ViewUser;
