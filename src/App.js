import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const GetAllUserLinks = async (SetAllUserLinks) => {
  const response = await axios.get("http://localhost:5000/");

  SetAllUserLinks(
    response.data.map((Link) => (
      <div className="Links">
        <a href={Link.FullLink}>{Link.FullLink}</a>
        <br />
        <a
          href={Link.FullLink}
        >{`http://localhost:5000/${Link.ShortenLink}`}</a>
      </div>
    ))
  );
};

const ShortenLink = async (UserInput) => {
  try {
    const response = await axios.post("http://localhost:5000/add", UserInput);

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

function App() {
  const [UserInput, SetUserInput] = useState({});
  const [AllUserLinks, SetAllUserLinks] = useState(<></>);

  useEffect(() => {
    GetAllUserLinks(SetAllUserLinks);
  }, [AllUserLinks]);

  const onChange = (e) => {
    SetUserInput({ Link: e.target.value });
  };

  return (
    <>
      <div className="Link Shorter">
        <input
          onChange={(e) => onChange(e)}
          placeholder="Write the link here"
        />
        <button onClick={() => ShortenLink(UserInput)}>Shorter</button>
      </div>
      {AllUserLinks}
    </>
  );
}

export default App;
