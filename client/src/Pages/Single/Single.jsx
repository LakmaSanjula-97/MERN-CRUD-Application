import SideBar from "../../components/SideBar/SideBar";
import SinglePost from "../../components/SinglePost/SinglePost";
import "./single.css";

export default function Single() {
  return (
    <div className="single">
      <SinglePost />
      <SideBar />
    </div>
  );
}
