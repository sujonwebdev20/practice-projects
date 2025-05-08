import { useState } from "react";
import { User } from "./interfaces";
import { socket } from "./services/socket";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (username: string) => {
    socket.connect();
    socket.emit("join", username);
    setCurrentUser({ id: socket.id, username: username });
  };

  const handleLogout = (username: string) => {
    socket.emit("userLeft", username);
    socket.disconnect();
    setCurrentUser(null);
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

export default App;
