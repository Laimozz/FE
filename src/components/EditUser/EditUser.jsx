import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css'; // nhớ viết CSS căn giữa tại đây

function EditUser() {
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const nav = useNavigate();

  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: ""
  });
// test hehe
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:8081/api/user/${user_id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      setUser(data);
      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        location: data.location || "",
        description: data.description || "",
        occupation: data.occupation || ""
      });
    };
    fetchUser();
  }, [user_id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSave = async () => {
    await fetch(`http://localhost:8081/api/user/${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    nav(`/users/${user_id}`);
  };

  return (
    <div className="edit-user-page">
      <h2>Edit Your Info</h2>
      <div className="edit-user-form">
        <input type="text" name="first_name" placeholder="First name" value={formData.first_name} onChange={handleChange} />
        <input type="text" name="last_name" placeholder="Last name" value={formData.last_name} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input type="text" name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} />
        <button onClick={handleSave}>Lưu</button>
      </div>
    </div>
  );
}

export default EditUser;
