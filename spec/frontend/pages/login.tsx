import LoginForm from "../components/forms/LoginForm";
import { useAppDispatch, useAppSelector } from '../redux/hoooks';
import { useVerify } from '../hooks/verify';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {XMarkIcon} from '@heroicons/react/24/outline';
import { Transition } from "@headlessui/react";
import { Fragment } from 'react';
import { setInvalid } from "../redux/auth.slice";

const tokenCreate = /* GraphQL */`
mutation tokenCreate($email: String!, $password: String!){
    tokenCreate(audience: "my-little-secret", email: $email, password: $password){
      token
      refreshToken
    }
  }
`

const tokenVerify = /* GraphQL */`
mutation tokenVerify($token: String!){
    tokenVerify(token: $token){
      isValid
    }
  }
`

export default function Login(){
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const isVerified = useVerify({auth});
  const router = useRouter();
  const [showAlert, setAlert] = useState(false);
  useEffect(()=>{
    if(isVerified){
      console.log("useEffect in LOGIN PAGE");
      
      router.push('/');
    }
    if(auth.invalid)
      setAlert(true);
  }, [isVerified, auth.invalid])

  function hideAlert(){
    setAlert(false);
    dispatch(setInvalid(false))
  }
  if(!auth.userToken)
    return(
        <>
        <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        show={showAlert}
      >
          <div role="alert" className="">
              <div className="border border-t-0 border-red-400 flex flex-row justify-between bg-red-500 text-white font-normal px-4 py-2">
                <div>Your email or password are invalid. Try again</div>
                <XMarkIcon className="h-4 w-4 self-center hover:bg-red-600 hover:rounded" onClick={hideAlert}/>
              </div>
          </div>
        </Transition>
        <div>
        <LoginForm />
        </div>
        </>
    )
}

