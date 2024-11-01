import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateUserProfile } from "../../../redux/action/userActions"; // Make sure this path is correct
import "./profilepage.css"; // Ensure you have this CSS file for styles

function ProfilePage() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.login.user?.id) || localStorage.getItem("userId");

  const [userData, setUserData] = useState({
    name: "",
    prenom: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch user data based on userId
  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Fetching user data...");

      try {
        const token = localStorage.getItem("token");
        console.log("User ID:", userId);
        console.log("Token:", token);

        const response = await axios.get(`http://localhost:5000/api/auth/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("User data fetched:", response.data); // Check the response data
        setUserData(response.data); // Assuming `response.data` contains the user's info
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error fetching user data.");
      } finally {
        setFetchingData(false);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      console.warn("No user ID available.");
    }
  }, [userId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`);
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit form to update user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    console.log("Submitting update with data:", userData);

    try {
      await dispatch(updateUserProfile(userData, userId)); // Update this based on your Redux action
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile.");
      console.error("Update Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {fetchingData ? (
        <p>Loading profile data...</p>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Prenom:
            <input
              type="text"
              name="prenom"
              value={userData.prenom}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default ProfilePage;
