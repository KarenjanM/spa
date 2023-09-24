export default function SkyButton({children, className="", onClick=()=>{}, disabled=false}){

    return(
        <button type="submit" onClick={onClick} className={!disabled ? `${className} rounded px-6 py-4 bg-sky-600 text-white` : `${className} rounded px-6 py-4 bg-zinc-300 text-white`} disabled={disabled}>
            {children}
        </button>
    )
}