"use client"

import { useState} from "react";
import {ROUTES} from "@/app/constants/routes"
import Link from "next/link";
import {useRouter} from 'next/navigation'
import { Menu } from "@/components/menu";

export default function Home() {
    const [fullname, setFullname] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const router = useRouter()

    const registerUser = async () => {
        try{
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
          if(response.status === 500){
              setError(true)
            }else{
                setError(false)
                window.location.href = ROUTES.login;
                router.push(ROUTES.login)

            }
            console.log(result)
        }catch(err){
          setError(true)
        }
      };
      
    return (
      <>
        <Menu showRightMenu={false}/>
        <div  className=" flex justify-center aling-center mt-6 mb-6">
          <div className="flex flex-col  p-6 rounded-md w-5/6 md:w-1/3">
            <Link href={ROUTES.login}>⬅️</Link>

            <label htmlFor="fullname" className="text-black text-medium">Fullname:</label>
            <input type="text" name="fullname" placeholder="Type your fullname..." className="p-2 text-small text-black border-2" value={fullname} onChange={(e)=>{setFullname(e.target.value)}} />
            
            <label htmlFor="email" className="text-black text-medium mt-2">Email:</label>
            <input type="text" name="email" placeholder="Type your email..." className="p-2 text-small text-black border-2" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            
            <label htmlFor="password" className="text-black text-medium">Password:</label>
            <input type="password" name="password" placeholder="Type your password..." className="p-2 text-small text-black border-2" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            
            {error&&<div className="text-red-100">Invalid data.</div>}
            
            <button type="submit" className="bg-black mt-6 rounded-md text-white p-2" onClick={()=>{registerUser()}}>Create Account</button>
          </div>
        </div>
      </>
  );
}