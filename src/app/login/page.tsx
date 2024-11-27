"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/app/constants/routes";
import { Menu } from "@/components/menu";
import { Input } from "@/components/input";

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
          <Input
            htmlFor={"email"}
            label={"Email:"}
            type={"text"}
            id={"email"}
            name={"email"}
            placeholder={"Type your email here..."}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            htmlFor={"password"}
            label={"Password:"}
            type={"password"}
            id={"password"}
            name={"password"}
            placeholder={"Type your password here..."}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          {error && <div className="text-red-600 mt-2">Incorrect credentials.</div>}

          <button
            type="button"
            className="w-2/3 bg-pink-300 text-white rounded-md p-2 m-2"
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
