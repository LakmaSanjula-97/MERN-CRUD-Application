import React, { useContext, useState } from "react";
import "./about.css";
import { Context } from "../../context/Context";

export default function About() {
  const { user } = useContext(Context);

  const [file] = useState(null);
  const [email, setEmail] = useState(user.email);
  const [desc, setDesc] = useState(user.desc);
  const [artistName, setArtistName] = useState(user.artistName);
  const [bdate, setBdate] = useState(user.bdate);

  const PF = "http://localhost:5000/images/";

  const imageUrls = [
    "https://c1.wallpaperflare.com/preview/421/894/499/guitar-music-band-instrument.jpg",
    "https://c4.wallpaperflare.com/wallpaper/74/540/987/black-and-white-jeans-music-alone-trains-guitars-boys-hats-playing-1680x1050-entertainment-music-hd-art-wallpaper-preview.jpg",
    "https://c1.wallpaperflare.com/preview/844/100/925/music-show-concert-live.jpg",
    "https://i.ytimg.com/vi/7xH_6KduYTk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBq7-VCd7BzCNbJN5-IqpCerLAcIQ",
    "https://wallpapers.com/images/hd/kitten-sleeping-on-guitar-9z1xi7x468mka799.jpg",
    "https://c1.wallpaperflare.com/preview/39/583/691/concert-confetti-party-event.jpg",
    "https://c1.wallpaperflare.com/preview/793/59/579/guitarist-guitar-music-person.jpg",
    "https://c1.wallpaperflare.com/preview/903/456/951/concert-sound-light-public.jpg",
    "https://wallpapercave.com/wp/wp2371670.jpg",
    // Add more image URLs here
  ];

  return (
    <div className="about">
      <div className="aboutHeaderText">
        <p className="aboutHeaderTextLT">Hello I'm MATEO ALEXANDER</p>
        <br />
        <p className="aboutHeaderTextST">Singer, Song Writer, Actor...</p>
      </div>
      <div className="headrDescAbout">
        <h3 className="aboutDescription">
          Singers perform vocal music in a variety of genres. Some specialize in
          a particular vocal style, such as opera or jazz. Singers may perform
          in different languages, such as French or Italian, particularly if
          they specialize in classical music or opera.
        </h3>
      </div>

      <div className="aboutDes">
        <div className="headerImgAbout">
          <img
            className="headerImgAbout"
            src={file ? URL.createObjectURL(file) : PF + user.profilePic}
            alt=""
          />
        </div>
        <div className="aboutDesText">
          <h2 className="desAboutHeader">Bio Data</h2>
          <div className="desAboutText">
            <div>
              <label className="aboutBio">Name : </label>
              <input
                className="aboutBioInput"
                readOnly
                type="text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
              />
            </div>
            <div>
              <label className="aboutBio">Date of Birth : </label>
              <input
                className="aboutBioInput"
                readOnly
                type="date"
                value={bdate}
                onChange={(e) => setBdate(e.target.value)}
              />
            </div>
            <div>
              <label className="aboutBio">Email : </label>
              <input
                className="aboutBioInput"
                readOnly
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label className="aboutBio">Description : </label>
            <div>
              <textarea
                readOnly
                className="aboutBioDesInput"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="aboutHeaderText">
        <p className="aboutHeaderTextLT">GALLERY</p>
      </div>
      <div className="gallery">
        {imageUrls.map((imageUrl, index) => (
          <div className="galleryItem" key={index}>
            <img className="galleryImg" src={imageUrl} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
