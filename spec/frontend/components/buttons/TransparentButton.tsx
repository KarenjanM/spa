export function TransparentButton({ children, onClick = () => { } }) {
    return (
        <button onClick={onClick} className="self-center border border-stone-500 py-3 px-9 hover:border-2">
            {children}
        </button>
    )
}