import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import AuthAlert from "../../components/Alert";
import RegisterForm from "../../components/forms/RegisterForm"
import { useAppSelector } from "../../redux/hooks";

export default function Register(){
    const router = useRouter();
    const auth = useAppSelector((state)=> state.auth);
    const [showAlert, setShowAlert] = useState(false); 
    const [alertText, setAlertText] = useState(""); 
    useEffect(()=>{
      if(auth.loggedIn)
        router.push("/profile")
    })
    function hideAlert(){
      setShowAlert(false)
    }
    return(
        <div>
            <AuthAlert show={showAlert} hide={hideAlert} text={alertText}/>
            <RegisterForm setAlertText={setAlertText} setShow={setShowAlert} />
        </div>
    )
}