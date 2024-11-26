"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/app/constants/routes";
import { Menu } from "@/components/menu";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError(true);
        return;
      }

      const result = await response.json();
      console.log(result)
      sessionStorage.setItem("Token", result.token);

      setError(false);
      router.push(ROUTES.market);

    } catch (err) {
      console.error("Login failed:", err);
      setError(true);
    }
  };

  return (
    <>
      <Menu showRightMenu={false} />
      <div className="flex justify-center align-center mt-6 mb-6">
        <div className="flex flex-col p-6 rounded-md w-4/5 md:w-1/3">
          <label htmlFor="email" className="text-black text-medium">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Type your email..."
            className="p-2 border-2 text-small text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="text-black text-medium">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Type your password..."
            className="p-2 text-small text-black border-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="text-red-600 mt-2">Incorrect credentials.</div>}

          <button
            type="button"
            className="bg-black mt-6 rounded-[10px] text-white p-3"
            onClick={handleLogin}
          >
            Login
          </button>

          <Link href={ROUTES.registerUser} className="text-black mt-2 text-center">
            Create Account
          </Link>
        </div>
      </div>
    </>
  );
}
