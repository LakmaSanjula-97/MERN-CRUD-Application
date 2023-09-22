import { useState } from "react";
import "./writePost.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [edate, setEdate] = useState("");
  const [etime, setEtime] = useState("00:00");
  const [venue, setVenue] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc,
      venue,
      edate,
      etime,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {}
    }

    try {
      const res = await axios.post("/post/", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {}
  };

  return (
    <div className="writepost">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="uploadFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus" title="Add Image"></i>
            <span>Upload an Image</span>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <label className="writeTitle">Title</label>
        <div className="writeFormGroup">
          <input
            required
            className="writeInput"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <label className="writeTitle">Venue</label>
        <div className="writeFormGroup">
          <input
            required
            className="writeInput"
            type="text"
            autoFocus={true}
            onChange={(e) => setVenue(e.target.value)}
          />
        </div>
        <label className="writeTitle">Date</label>
        <div className="writeFormGroup">
          <DatePicker
            required
            className="writeInput"
            selected={edate}
            onChange={(date) => setEdate(date)}
          />
        </div>
        <label className="writeTitle">Time</label>
        <div className="writeFormGroup">
          <TimePicker
            required
            className="writeInput"
            placeholder="Select Time"
            use12Hours
            showSecond={false}
            focusOnOpen={true}
            format="hh:mm A"
            onChange={(newTime) => setEtime(newTime.format("LT"))}
          />
        </div>
        <label className="writeTitle">Description</label>
        <div className="writeFormGroup">
          <textarea
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
