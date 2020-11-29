const GlobalError = (status, text) => {
  const div = document.createElement("div");
  div.className = "GlobalError";
  const image = require("./img/SadFace.png");
  div.insertAdjacentHTML(
    "afterBegin",
    `
    <img src = ${image.default} alt = "Oooops">
    <div class = "ErrorName">Error: ${status}</div>
    <div class = s"ErrorText">${text}</div>
    `
  );
  document.body.innerHTML = "";
  document.body.append(div);
};

const ClientErrors = (text) => {
  const input = document.getElementById("LinkInput");
  input.placeholder = text;
  input.className += "Error";
};

export const ErrorHandler = (error) => {
  if (error.response === undefined) {
    GlobalError(500, "No response from the server!");
  } else if (error.response.data === "Invalid link address") {
    ClientErrors(error.response.data);
  } else if (error.response.data === "Link already exists!") {
    ClientErrors(error.response.data);
  } else {
    GlobalError(error.response.status, "Something went wrong");
  }
};
