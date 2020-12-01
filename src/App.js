import React, { useEffect, useState } from "react";
import axios from "axios";
import { ErrorHandler } from "./ErrorHandler.js";

const serverAddress = "http://localhost:5000/";

const DeleteLink = async (link) => {
  try {
    await axios.post(serverAddress + "delete", { Link: link });
  } catch (err) {
    ErrorHandler(err);
  }
};

const ShortenLink = async (UserInput) => {
  try {
    await axios.post(serverAddress + "add", UserInput);
  } catch (err) {
    ErrorHandler(err);
  }
};

function App() {
  const [UserInput, SetUserInput] = useState({ Link: "" });
  const [AllUserLinks, SetAllUserLinks] = useState([]);

  useEffect(() => {
    const GetAllUserLinks = async () => {
      try {
        const response = await axios.get(serverAddress);

        SetAllUserLinks(response.data);
      } catch (err) {
        ErrorHandler(err);
      }
    };

    GetAllUserLinks();
  }, [AllUserLinks]);

  const onChange = (e) => {
    SetUserInput({ Link: e.target.value });
    e.target.placeholder = "Write the link here";
    e.target.className = "";
  };

  const onClick = () => {
    SetUserInput({ Link: "" });
    ShortenLink(UserInput);
  };

  return (
    <main>
      <div id="LinkShortener">
        <input
          id="LinkInput"
          onChange={(e) => onChange(e)}
          value={UserInput.Link}
          placeholder="Write the link here"
        />
        <button onClick={() => onClick()}>Reduce</button>
      </div>
      {AllUserLinks.map((Link) => (
        <div className="Links">
          <button onClick={() => DeleteLink(Link.FullLink)} />
          <a href={Link.FullLink}>{Link.FullLink}</a>
          <br />
          <a href={Link.FullLink}>{serverAddress + Link.ShortenLink}</a>
        </div>
      ))}
    </main>
  );
}

export default App;
