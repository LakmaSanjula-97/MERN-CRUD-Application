import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";

  // Convert the date string to an ISO date object
  const date = new Date(post.edate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}

      <div className="postInfo">
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
      </div>
      <div className="postSubInfo">
        <p className="postDesc">Date : {formattedDate}</p>
        <p className="postDesc">{post.desc}</p>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
    </div>
  );
}
