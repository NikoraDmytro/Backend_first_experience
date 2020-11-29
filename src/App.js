import React, { useEffect, useState } from "react";
import axios from "axios";
import { ErrorHandler } from "./ErrorHandler.js";

const DeleteLink = async (link) => {
  try {
    await axios.post("http://localhost:5000/delete", { Link: link });
  } catch (err) {
    ErrorHandler(err);
  }
};

const ShortenLink = async (UserInput) => {
  try {
    await axios.post("http://localhost:5000/add", UserInput);
  } catch (err) {
    ErrorHandler(err);
  }
};

function App() {
  const [UserInput, SetUserInput] = useState({});
  const [AllUserLinks, SetAllUserLinks] = useState([]);

  useEffect(() => {
    const GetAllUserLinks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/");

        SetAllUserLinks(response.data);
      } catch (err) {
        ErrorHandler(err);
      }
    };

    GetAllUserLinks();
  }, [AllUserLinks]);

  const onChange = (e) => {
    SetUserInput({ Link: e.target.value });
    const input = document.getElementById("LinkInput");
    input.placeholder = "Write the link here";
    input.className = "";
  };

  const onClick = () => {
    ShortenLink(UserInput);
    const input = document.getElementById("LinkInput");
    input.value = "";
  };

  return (
    <main>
      <div id="LinkShortener">
        <input
          id="LinkInput"
          onChange={(e) => onChange(e)}
          placeholder="Write the link here"
        />
        <button onClick={() => onClick()}>Reduce</button>
      </div>
      {AllUserLinks.map((Link) => (
        <div className="Links">
          <button onClick={() => DeleteLink(Link.FullLink)} />
          <a href={Link.FullLink}>{Link.FullLink}</a>
          <br />
          <a
            href={Link.FullLink}
          >{`http://localhost:5000/${Link.ShortenLink}`}</a>
        </div>
      ))}
    </main>
  );
}

export default App;
