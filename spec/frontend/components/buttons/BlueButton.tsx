export default function BlueButton({children}){

    return(
        <button className="self-end rounded bg-cyan-700 text-white px-6 py-4">
            {children}
        </button>
    )
}