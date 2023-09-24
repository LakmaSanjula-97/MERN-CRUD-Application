import React, { useEffect, useState } from "react";
import "./sidebarCalendar.css";
import axios from "axios";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function SidebarCalendar() {
    
  const [uniqueEdates, setUniqueEdates] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

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

  // formatDate function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const uniqueEdateSet = new Set();
    posts.forEach((post) => {
      post.venue.forEach((venue) => {
        uniqueEdateSet.add(formatDate(post.edate));
      });
    });
    setUniqueEdates(Array.from(uniqueEdateSet));
  }, [posts]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

   return (
     <div className="sidebarcalender">
       <Calendar
         onChange={handleDateChange}
         value={selectedDate}
         tileClassName={({ date }) => {
           const formattedDate = formatDate(date);
           return uniqueEdates.includes(formattedDate)
             ? "highlighted-date"
             : "";
         }}
       />
     </div>
   );
}
