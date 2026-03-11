import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/UserList.css";

function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users?page=${page}&limit=6`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
      });
  }, [page]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this user?")) return;

    await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
      method: "DELETE",
    });

    setUsers(users.filter((u) => u._id !== id));
  };

  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      <header className="header">
        <div className="header-container">
          <h1>User Management</h1>

          <Link to="/add-user">
            <button className="add-user-btn">+ Add User</button>
          </Link>
        </div>
      </header>

      <main className="main">

        <div className="filters">

          <input
            className="search-input"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <a
            href={`${import.meta.env.VITE_API_URL}/api/users/export`}
            className="export-btn"
          >
            Export CSV
          </a>

        </div>


        <div className="user-grid">

          {filteredUsers.map((user) => (

            <div className="user-card" key={user._id}>

              <div className="user-header">

                <div className="avatar">
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </div>

                <div>
                  <h3>{user.firstName} {user.lastName}</h3>

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


              <div className="user-info">

                <div>
                  <span>Email</span>
                  <p>{user.email}</p>
                </div>

                <div>
                  <span>Mobile</span>
                  <p>{user.mobile}</p>
                </div>

                <div>
                  <span>Gender</span>
                  <p>{user.gender}</p>
                </div>

              </div>


              <div className="actions">

                <Link to={`/view-user/${user._id}`}>
                  <button className="view-btn">View</button>
                </Link>

                <Link to={`/edit-user/${user._id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>


        <div className="pagination">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span className="page-number">{page}</span>

          <button onClick={() => setPage(page + 1)}>
            Next
          </button>

        </div>

      </main>
    </div>
  );
}

export default UserList;
