import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import "./singlepost.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
//import { Link } from "react-router-dom/cjs/react-router-dom";
import { Context } from "../../context/Context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPosts] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [etime, setEtime] = useState("");
  const [edate, setEdate] = useState(new Date());
  const [venue, setVenue] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const PF = "http://localhost:5000/images/";

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/post/" + path);
      setPosts(res.data);
      setTitle(res.data.title);
      setVenue(res.data.venue);
      setDesc(res.data.desc);
      setEdate(new Date(res.data.edate));
      setEtime(res.data.etime);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/post/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/post/${post._id}`, {
        username: user.username,
        title,
        venue,
        desc,
        etime,
        edate: edate.toISOString(),
      });
      //window.location.reload();
      setUpdateMode(false);
    } catch (error) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="singlePostEditInput"
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-regular fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Artist : Mateo Alexander
            {/* <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link> */}
          </span>
          <span className="singlepostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        <span className="PostCatInfo">Venue : </span>
        {updateMode ? (
          <input
            className="singlePostCatInput"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        ) : (
          <p className="singlePostCat">{venue}</p>
        )}

        <span className="PostCatInfo">Date : </span>
        {updateMode ? (
          <DatePicker
            className="singlePostCatInput"
            selected={edate}
            onChange={(date) => setEdate(date)}
          />
        ) : (
          <p className="singlePostCat">{edate.toDateString()}</p>
        )}

        <span className="PostCatInfo">Time : </span>
        {updateMode ? (
          <TimePicker
            selected={etime}
            use12Hours
            showSecond={false}
            focusOnOpen={true}
            format="hh:mm A"
            onChange={(newTime) => setEtime(newTime.format("LT"))}
          />
        ) : (
          <p className="singlePostCat">{etime.toString()}</p>
        )}
        <span className="PostCatInfo">Description : </span>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
