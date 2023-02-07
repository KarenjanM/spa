export default function SubmitButton({text}){
    return(
        <button className="bg-stone-600 text-white py-3 px-7 hover:scale-105 font-light self-center tracking-wide" type="submit">
            {text}    
        </button>
    )
}