import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [error, setError] = useState("");
  // const login = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch("http://localhost:4000/login", {
  //     method: "POST",
  //     body: JSON.stringify({ username, password }),
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //   });

  //   if (response.ok) {
  //     response.json().then((userInfo) => {
  //       setUserInfo(userInfo);
  //       setRedirect(true);
  //     });
  //   } else {
  //     alert("wrong credentials");
  //   }
  // };

  // if (redirect) {
  //   return <Navigate to={"/"} />;
  // }
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        setRedirect(true);
      } else {
        setError("Wrong credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button>Login</button>
    </form>
  );
};

export default LoginPage;
