//  I will rewrite this with useActionState.
"use client";
import Link from "next/link";
import { useState } from "react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token); // Store the JWT token
        window.location.href = "/dashboard"; // Redirect to a protected page
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Login failed. Please check your name and credentials.");
    }
  };

  return (
    <div className="absolute top-0 left-0 bg-slate-200/30 backdrop-blur-lg h-screen w-full">
      <form
        className="relative top-1/4 min-h-52 bg-slate-800 rounded-md flex flex-col m-10 gap-3"
        onSubmit={handleSubmit}
      >
        <legend className="bg-slate-900 p-3 text-center text-xl rounded-t-lg">
          Login
        </legend>
        <div className="flex items-center justify-center gap-3 ">
          <label htmlFor="username">User name</label>

          <input
            name="username"
            id="username"
            className="p-2 text-black rounded-sm"
            type="text"
            tabIndex={10}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="flex items-center justify-center gap-5 flex-1">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            tabIndex={10}
            className="p-2 rounded-sm text-black"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="flex flex-col">
          <input
            tabIndex={10}
            type="submit"
            className="bg-blue-950 m-4 p-4 hover:bg-blue-800 rounded-md cursor-pointer shadow-xl "
            value={"Submit"}
          />
          {error && <div className="text-red-400 text-center mb-3">{error}</div>}
        </div>
        <div className="group text-center  p-2 text-xl">
            <Link  href={"/create-account"}> Don't have an Account, click here to <span className="group-hover:text-blue-600"> create Account </span> </Link>
        </div>
      </form>
    </div>
  );
};
