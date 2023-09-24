import { ClipLoader } from "react-spinners";

export default function Spinner({color, size}: {color?: "white" | "black", size?: number}){
    return(
        <div className="flex place-content-center my-auto"><ClipLoader color={color} size={size}/></div>
    )
} 