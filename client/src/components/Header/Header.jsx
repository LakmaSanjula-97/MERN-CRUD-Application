import "./header.css";
import image from "../../Assests/home-banner.jpg";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Singer, Song Writer, Actor...</span>
        <span className="headerTitleLg">MATEO ALEXANDER</span>
      </div>
      <img className="headerImg" src={image} alt="" />
    </div>
  );
}
