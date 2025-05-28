import { SearchBar } from "../Components/SearchBar";
import { Trending } from "../Components/Trending"
import { ErrorBoundary } from "../Components/ErrorBoundary";

export function Stream() {
    return <div>
         <ErrorBoundary>
            <SearchBar/>
        </ErrorBoundary>
        <ErrorBoundary>
            <Trending />
        </ErrorBoundary>
    </div>
}