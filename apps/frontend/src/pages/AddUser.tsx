import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AddUser.css";

function AddUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    status: "active",
    location: "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("email", form.email);
    formData.append("mobile", form.mobile);
    formData.append("gender", form.gender);
    formData.append("status", form.status);
    formData.append("location", form.location);

    if (profileImage) {
      formData.append("profile", profileImage);
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      navigate("/");
    } else {
      alert("User creation failed");
    }
  };

  return (
    <div className="add-user-page">
      <header className="add-header">
        <div className="header-inner">
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back to Users
          </button>

          <h1>Add User</h1>
        </div>
      </header>

      <main className="add-main">
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="profile-upload">
              <label>Profile Picture</label>

              <div className="avatar-preview">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <span>+</span>
                )}
              </div>

              <input
                type="file"
                name="profile"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

            <div className="form-grid">
              <div>
                <label>First Name</label>
                <input
                  name="firstName"
                  placeholder="Jane"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Last Name</label>
                <input
                  name="lastName"
                  placeholder="Doe"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="full">
                <label>Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Mobile</label>
                <input
                  name="mobile"
                  placeholder="+1 (555) 000"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Gender</label>

                <select name="gender" onChange={handleChange}>
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label>Status</label>

                <select name="status" onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label>Location</label>
                <input
                  name="location"
                  placeholder="City"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                Save User
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>

              
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddUser;
