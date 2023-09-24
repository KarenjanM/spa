export default function getCurrencySymbol(currency: "USD" | "EUR"){
    switch(currency){
        case "USD":
            return "$";
        case "EUR":
            return "€";
    }
}