export function AdressBlock({ address }) {
    return (
        <div className="text-stone-500 flex flex-col">
            <div>
                {address?.firstName} {address?.lastName}
            </div>
            <div>
                {address?.companyName}
            </div>
            <div>
                {address?.streetAddress1}
            </div>
            <div>
                {address?.streetAddress2}
            </div>
            <div>
                {address?.postalCode} {address?.city}
            </div>
            <div>
                {address?.country?.country}
            </div>
        </div>
    )
}