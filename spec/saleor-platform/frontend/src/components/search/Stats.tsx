import { useStats } from "react-instantsearch-hooks-web";

export default function Stats(){
  const stats = useStats();
    return(
        <div>
            {stats.nbHits} Ergebnisse
        </div>
    )
}