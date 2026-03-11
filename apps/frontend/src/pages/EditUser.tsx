import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/EditUser.css";


function EditUser() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    status: "",
    location: "",
  });

  const [profile, setProfile] = useState("");

  useEffect(() => {

    fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));

  }, [id]);

  const handleChange = (e:any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e:any) => {
    const file = e.target.files[0];
    if(file){
      setProfile(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(form)
    });

    navigate("/");
  };

  return (

    <div className="edit-page">



      <header className="edit-header">

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


      <main className="edit-main">

        <div className="page-title">

          <h1>Edit User</h1>
          <p>Manage user account details and permissions.</p>

        </div>




        <div className="profile-card">

          <div className="profile-row">

            <div className="avatar">

              {profile ? (
                <img src={profile} alt="profile"/>
              ) : (
                <span>
                  {form.firstName?.[0]}
                  {form.lastName?.[0]}
                </span>
              )}

            </div>

            <div className="profile-info">

              <h3>Profile Photo</h3>

              <p>PNG, JPG or GIF. Max 5MB.</p>

              <div className="profile-buttons">

                <label className="upload-btn">
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    hidden
                  />
                </label>

                <button
                  className="remove-btn"
                  onClick={()=>setProfile("")}
                  type="button"
                >
                  Remove
                </button>

              </div>

            </div>

          </div>

        </div>




        <div className="form-card">

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div>
                <label>First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="full">
                <label>Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Mobile</label>
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Gender</label>

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

              </div>

              <div>
                <label>Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>

              </div>

              <div className="full">
                <label>Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>

            </div>


            <div className="form-actions">

              <button
                type="submit"
                className="update-btn"
              >
                Update User
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={()=>navigate("/")}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

        <div className="footer-info">
          Last login: Oct 24, 2023 at 2:45 PM
        </div>

      </main>

    </div>
  );
}

export default EditUser;
