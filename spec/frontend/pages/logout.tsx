import useLogOut from "../hooks/logout"

export default function Logout(){
    const data = useLogOut()
    return(
        <>Signing out...</>
    )
}