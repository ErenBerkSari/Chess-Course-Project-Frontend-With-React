import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

import "../../css/AdminDashboardUser.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUsersListState,
  deleteUser,
  getAllUser,
  getUserProgress,
} from "../../redux/slices/userSlice";
import ClipLoader from "../ClipLoader";
import { format } from "date-fns";

function AdminDashboardUser() {
  const { users, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());

    return () => {
      dispatch(clearUsersListState());
    };
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");

  // Search function
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filtering based on search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm)
  );

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const result = await dispatch(deleteUser(userId)).unwrap();

        // Optional: Show a success toast
        toast.success("User successfully deleted");
      } catch (error) {
        // Optional: Show an error toast
        toast.error("An error occurred while deleting the user");
        console.error("Delete user error:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
        }}
      >
        <ClipLoader color="#4caf50" loading={true} size={50} />
        <div>Loading, please wait...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="container-lg">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    User <b>Details</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <div className="search-box">
                    <div className="input-group">
                      <input
                        type="text"
                        id="search"
                        className="form-control"
                        placeholder="Username..."
                        onChange={handleSearch}
                        value={searchTerm}
                      />
                      <span className="input-group-addon">
                        <i className="material-icons">&#xE8B6;</i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th style={{ width: "22%" }}>Username</th>
                  <th style={{ width: "22%" }}>Email</th>
                  <th>Registration Date</th>
                  <th>Level</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <img
                        src={
                          user.profileImage
                            ? `http://localhost:3000${user.profileImage}`
                            : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        }
                        width={25}
                        style={{ borderRadius: "15px" }}
                      />
                    </td>

                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{format(new Date(user.createdAt), "dd/MM/yyyy")}</td>
                    <td>{user.userLevel}</td>
                    <td>{user.role}</td>
                    <td>
                      <a
                        href="#"
                        className="delete"
                        title="Delete"
                        onClick={() => handleDelete(user._id)} // Delete function
                      >
                        <i className="material-icons">&#xE872;</i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardUser;
