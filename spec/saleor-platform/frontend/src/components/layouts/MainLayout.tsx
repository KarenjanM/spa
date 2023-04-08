import Footer from "../Footer";
import Header from "../Header";

export function MainLayout({children}){
    return(
        <main className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Footer />
        </main>
    )
}