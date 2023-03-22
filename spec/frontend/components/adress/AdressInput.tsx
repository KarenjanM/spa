export function AdressInput({type="text", defaultValue="", placeholder="", className="", onChange}){
    return(
        <input type={type} onChange={(value)=>onChange(value)} defaultValue={defaultValue} placeholder={placeholder} className={`${className} border border-stone-500 px-5 py-2 placeholder:text-stone-600`}>
        </input>
    )
}