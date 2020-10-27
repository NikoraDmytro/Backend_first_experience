import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [UserInput, SetUserInput] = useState({});
  const [AllLinks, setAllLinks] = useState(<></>);

  const onLinkChange = (e) => {
    SetUserInput({ Link: e.target.value });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        if (res.data.length > 0) {
          setAllLinks(
            res.data.map((Data) => {
              return (
                <div className="link">
                  <a href={Data.FullLink}>{Data.FullLink}</a>
                  <br />
                  <a href={Data.FullLink}>
                    {"http://localhost:5000/" + Data.ShortenLink}
                  </a>
                </div>
              );
            })
          );
        }
      })
      .catch((err) => console.log(err));
  });

  const ShorterLink = () => {
    axios
      .post("http://localhost:5000/add", UserInput)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="Link Shorter">
        <input
          onChange={(e) => onLinkChange(e)}
          placeholder="Write the link here"
        />
        <button onClick={() => ShorterLink()}>Shorter</button>
      </div>
      <div className="Links">{AllLinks}</div>
    </>
  );
}

export default App;
