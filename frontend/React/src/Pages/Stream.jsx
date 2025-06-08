import { SearchBar } from "../Components/SearchBar"
import { Trending } from "../Components/Trending"
import { ErrorBoundary } from "../Components/ErrorBoundary"

export function Stream() {
    return <>
    <div class="min-h-screen bg-[#0C0516] overflow-x-hidden">
        <ErrorBoundary>
            <SearchBar />
        </ErrorBoundary>
        <ErrorBoundary>
            <Trending />
        </ErrorBoundary>
    </div>
    </>
}