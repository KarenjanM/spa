export default function ColHeaders() {
    return (
        <div className='grid grid-cols-5 justify-between px-12 py-6 text-gray-400 text-sm'>
            <div className='col-span-3'>PRODUKT</div>
            <div className='col-span-1'>ANZAHL</div>
            <div className='col-span-1'>GESAMTESUME</div>
        </div>
    )
}