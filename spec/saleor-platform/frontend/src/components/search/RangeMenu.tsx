import { useRange } from "react-instantsearch-hooks-web";
import { useEffect, useState } from "react";

export function RangeMenu() {
    const {
        start,
        range,
        refine,
    } = useRange({ attribute: "grossPrice" });
    
    function handleClick() {
        refine(undefined);
    }
    return (
        <div className="grid grid-rows-2 divide-y divide-gray-300">
            <div className="flex flex-row justify-between place-items-center gap-5 px-5 py-2">
                <div>
                    Der höchste Preis ist {range.max}€
                </div>
                <button onClick={handleClick} className="underline">
                    Zurücksetzen
                </button>
            </div>
            <div className="flex flex-row gap-5 py-1">
                <RangeInput value={isFinite(start[0]) ? start[0] : undefined} refine={(value) =>refine([value, isFinite(start[1]) ? start[1] : undefined])} placeholder="Von" />
                <RangeInput value={isFinite(start[1]) ? start[1] : undefined} refine={(value) => refine([isFinite(start[0]) ? start[0] : undefined, value])} placeholder="Bis" />
            </div>
        </div>
    )
}

export function RangeInput({ placeholder, refine, value }: { placeholder: string, refine: (value) => void, value: number }) {
    const [currValue, setValue] = useState(value);
    useEffect(()=>setValue(value), [value])
    function handleChange(e) {
        if(e.target.value >= 0){
        refine(e.target.value)
        setValue(e.target.value)
        }
    }
    return (
        <div className="flex flex-row gap-1 place-items-center">
            €
            <div className="border">
                <input type="number" onChange={handleChange} className="pl-3 pr-1 py-2 placeholder:text-stone-700 placeholder:text-xl focus:outline-none" placeholder={placeholder} value={currValue} />
            </div>
        </div>
    )
}