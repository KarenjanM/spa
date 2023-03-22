import LoginForm from "../components/forms/LoginForm";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useVerify } from '../hooks/verify';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { setInvalid } from "../redux/auth.slice";
import { useApolloClient } from "@apollo/client";
import AuthAlert from "../components/Alert";


export default function Login(){
  // getting the auth object from redux store
  const auth = useAppSelector((state) => state.auth);
  const client = useApolloClient();
  const dispatch = useAppDispatch();
  // getting boolean value of loggedIn from useVerify hook to check if user is already logged in
  const loggedIn = useVerify({auth});
  const router = useRouter();
  const [showAlert, setAlert] = useState(false);
  useEffect(()=>{
    if(loggedIn){
      console.log("useEffect in LOGIN PAGE");
      client.resetStore()
      router.back();
    }
    if(auth.invalid)
      setAlert(true);
  }, [loggedIn, auth.invalid])

  // simple function to hide the alert
  function hideAlert(){
    setAlert(false);
    dispatch(setInvalid(false))
  }
  if(!auth.userToken)
    return(
        <>
        <AuthAlert show={showAlert} hide={hideAlert} text={"Your email or password are invalid. Try again"}/>
        <div>
        <LoginForm />
        </div>
        </>
    )
}

