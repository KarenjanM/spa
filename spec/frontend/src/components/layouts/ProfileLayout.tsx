export default function ProfileLayout({children}){
    return(
        <div className="container grid grid-rows-2 gap-8 content-center py-20 px-20">
            {children}
        </div>
    )
}