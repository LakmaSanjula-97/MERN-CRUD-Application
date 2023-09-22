import { useContext, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import "./setting.css";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Setting() {
  const { user, dispatch } = useContext(Context);

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [desc, setDesc] = useState(user.desc);
  const [artistName, setArtistName] = useState(user.artistName);
  const [bdate, setBdate] = useState(user.bdate);
  const [success, setSuccess] = useState(false);

  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
      desc,
      artistName,
      bdate,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {}
    }

    try {
      const res = await axios.put("/user/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/user/${user._id}`, {
        data: { userId: user._id },
      });
      window.location.replace("/register");
    } catch (error) {}
  };

  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle">Delete Account</span>
        </div>
        <form className="settingForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingPPIcon fa-solid fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Name</label>
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
          <label>Date of Birth</label>
          <input
            type="date"
            value={bdate}
            onChange={(e) => setBdate(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Username</label>
          <input
            type="text"
            // placeholder={user.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            required
            type="password"
            placeholder="Please create a new password when you update the profile"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Description</label>
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className="settingSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
          <button
            className="settingDelete"
            type="submit"
            onClick={handleDelete}
          >
            Delete
          </button>
        </form>
      </div>
      <SideBar />
    </div>
  );
}
