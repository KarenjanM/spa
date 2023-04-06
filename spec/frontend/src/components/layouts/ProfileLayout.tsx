export default function ProfileLayout({children}){
    return(
        <div className="sm:container flex flex-col sm:grid sm:grid-rows-2 gap-8 content-center py-20 px-20">
            {children}
        </div>
    )
}