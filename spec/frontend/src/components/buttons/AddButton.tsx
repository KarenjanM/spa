export default function AddButton({className="", text, onClick, disabled}){
    return (
        <button disabled={disabled} className={`${className} bg-transparent border border-black hover:bg-black text-black hover:text-white font-normal py-2 px-10`} onClick={onClick}>
            {text}
        </button>
    )
  }