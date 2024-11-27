"use client"

import { useState } from "react";
import { ROUTES } from "@/app/constants/routes"
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { Menu } from "@/components/menu";
import { Input } from "@/components/input";

export default function Home() {
  const [fullname, setFullname] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const router = useRouter()

  const registerUser = async () => {
    try {
      var token = sessionStorage.getItem("Token");
      const response = await fetch('http://localhost:8080/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullname: fullname,
          email: email,
          password: password
        }),
      });
      const result = await response.json();
      if (response.status === 500) {
        setError(true)
      } else {
        setError(false)
        window.location.href = ROUTES.login;
        router.push(ROUTES.login)

      }
      console.log(result)
    } catch (err) {
      setError(true)
    }
  };

  return (
    <>
      <Menu showRightMenu={false} />
      <div className=" flex justify-center aling-center mt-6 mb-6">
        <div className="flex flex-col  p-6 rounded-md w-5/6 md:w-1/3">
          <Link href={ROUTES.login}>⬅️</Link>

          <Input
            htmlFor={"fullname"}
            label={"Fullname:"}
            type={"text"}
            id={"fullname"}
            name={"fullname"}
            placeholder={"Type your fullname here..."}
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

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

          {error && <div className="text-red-100">Invalid data.</div>}

          <button type="submit" className="w-3/3 bg-pink-300 text-white rounded-md p-2 m-2" onClick={() => { registerUser() }}>Create Account</button>
        </div>
      </div>
    </>
  );
}