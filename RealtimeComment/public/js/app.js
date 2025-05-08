let username;
let socket = io();

do {
  username = prompt("Enter your username: ");
} while (!username);

const textarea = document.querySelector("#textarea");
const submitBtn = document.querySelector("#submitBtn");
const commentBox = document.querySelector(".comment__box");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let comment = textarea.value;
  if (!comment) {
    return;
  }
  postComment(comment);
});

function postComment(comment) {
  // Append to dom
  let data = {
    username: username,
    comment: comment,
    timestamp: new Date().toISOString(),
  };
  appendToDom(data);
  textarea.value = "";
  // Broadcast
  broadcastComment(data);
  // Sync with MongoDB
  syncWithDb(data);
}

function appendToDom(data) {
  let lTag = document.createElement("li");
  lTag.classList.add("comment", "mb-3");
  let markup = `
    <div class="card border-light mb-3">
      <div class="card-body">
        <h6>${data.username}</h6>
        <p>
          ${data.comment}
        </p>
        <div class="d-flex align-items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 50 50"
          >
            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 6.9863281 A 1.0001 1.0001 0 0 0 24 8 L 24 22.173828 A 3 3 0 0 0 22 25 A 3 3 0 0 0 22.294922 26.291016 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 23.708984 27.705078 A 3 3 0 0 0 25 28 A 3 3 0 0 0 28 25 A 3 3 0 0 0 26 22.175781 L 26 8 A 1.0001 1.0001 0 0 0 24.984375 6.9863281 z"></path>
          </svg>
          <small class="fs-9">${moment(data.time).format("LT")}</small>
        </div>
      </div>
    </div>
  `;

  lTag.innerHTML = markup;
  commentBox.prepend(lTag);
}

function broadcastComment(data) {
  // Socket
  socket.emit("comment", data);
}

socket.on("comment", (data) => {
  appendToDom(data);
});

let timerId = null;
function debounce(func, timer) {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    func();
  }, timer);
}

let typingDiv = document.querySelector(".typing");
socket.on("typing", (data) => {
  typingDiv.textContent = data.username + " is typing...";
  debounce(function () {
    typingDiv.textContent = "";
  }, 1000);
});

// Event listener on textarea
textarea.addEventListener("keyup", (e) => {
  socket.emit("typing", { username });
});

// Api calls
function syncWithDb(data) {
  const headers = {
    "Content-Type": "application/json",
  };

  fetch("/api/comment", {
    method: "POST",
    body: JSON.stringify(data),
    headers,
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
}

function fetchComments() {
  fetch("/api/comments")
    .then((response) => response.json())
    .then((comments) => {
      comments;
      comments.forEach((comment) => {
        comment.time = comment.createdAt;
        console.log(comment);

        appendToDom(comment);
      });
    })
    .catch((error) => console.log(error));
}

window.onload = fetchComments;
