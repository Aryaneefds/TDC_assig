import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleLogin = () => {

    if(
      username === "matchmaker" &&
      password === "tdc123"
    ){

      localStorage.setItem(
        "isAuthenticated",
        "true"
      );

      navigate("/");

    } else {

      alert(
        "Invalid Credentials"
      );
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      justify-center
      items-center
      bg-slate-100
      "
    >

      <div
        className="
        bg-white
        p-8
        rounded-lg
        shadow-lg
        w-96
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          mb-6
          "
        >
          TDC Matchmaker
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>
            setUsername(
              e.target.value
            )
          }
          className="
          border
          w-full
          p-2
          mb-4
          rounded
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
          className="
          border
          w-full
          p-2
          mb-4
          rounded
          "
        />

        <button
          onClick={handleLogin}
          className="
          w-full
          bg-blue-600
          text-white
          p-2
          rounded
          "
        >
          Login
        </button>

      </div>

    </div>
  );
}