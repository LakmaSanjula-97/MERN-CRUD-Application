import { useEffect, useState } from "react";
import "./sideBar.css";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default function SideBar() {
  const [uniqueVenues, setUniqueVenues] = useState([]);
  const [uniqueEdates, setUniqueEdates] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("/post");
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else if (res.data && Array.isArray(res.data.posts)) {
          setPosts(res.data.posts);
        } else {
          console.error("Invalid response data structure:", res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getPosts();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const uniqueVenueSet = new Set();
    const uniqueEdateSet = new Set();
    posts.forEach((post) => {
      post.venue.forEach((venue) => {
        uniqueVenueSet.add(venue);
        uniqueEdateSet.add(post.edate);
      });
    });
    setUniqueVenues(Array.from(uniqueVenueSet));
    setUniqueEdates(Array.from(uniqueEdateSet));
  }, [posts]);

  return (
    <div className="sidebar">
      <div className="sidebarDateItem">
        <span className="sidebarDateTitle">CONCERT DATES</span>
        <ul className="sidebarDateList">
          {uniqueEdates.map((edate) => (
            <Link to={`/?edate=${edate}`} className="link" key={edate}>
              <li className="sidebarDateListItem">{formatDate(edate)}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CONCERT VENUES</span>
        <ul className="sidebarList">
          {uniqueVenues.map((venue, index) => (
            <Link to={`/?venue=${venue}`} className="link" key={index}>
              <li className="sidebarListItem">{venue}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
        </div>
      </div>
    </div>
  );
}
