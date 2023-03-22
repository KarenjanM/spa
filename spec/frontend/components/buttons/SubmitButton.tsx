export default function SubmitButton({children, onClick=()=>{}, className="", disabled=false}){
    return(
        <button onClick={onClick} className={`${className} bg-stone-600 text-white py-3 px-20 hover:scale-105 font-light tracking-wide`} type="submit" disabled={disabled}>
            {children}    
        </button>
    )
}