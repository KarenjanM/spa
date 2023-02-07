export default function AddButton({text, onClick}){
    return(
    <button className="bg-transparent border border-black hover:bg-black text-black hover:text-white font-semibold py-2 px-4 rounded" onClick={onClick}>
        {text}
    </button>
  );
  }