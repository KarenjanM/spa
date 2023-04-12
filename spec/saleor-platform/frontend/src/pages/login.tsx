import LoginForm from "../components/forms/LoginForm";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useVerify } from '../hooks/verify';
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { setInvalid } from "../redux/auth.slice";
import { useApolloClient } from "@apollo/client";
import AuthAlert from "../components/Alert";
import useGetUser from "../hooks/user";
import { CheckoutContext } from "../contexts/checkoutContext";


export default function Login(){
  // getting the auth object from redux store
  const auth = useAppSelector((state) => state.auth);
  const client = useApolloClient();
  const dispatch = useAppDispatch();
  const {setCheckoutId} = useContext(CheckoutContext);
  const user = useGetUser();
  // getting boolean value of loggedIn from useVerify hook to check if user is already logged in
  const loggedIn = useVerify({auth});
  const router = useRouter();
  const [showAlert, setAlert] = useState(false);

  useEffect(()=>{
    if(loggedIn){
      client.resetStore();
      console.log(window.history);
      router.back();
      if(user)
        setCheckoutId(user?.user?.checkout?.id);
    }
    if(auth.invalid)
      setAlert(true);
  }, [loggedIn, auth.invalid, user?.user?.checkout?.id])

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

