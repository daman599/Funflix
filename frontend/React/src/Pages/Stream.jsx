import { SearchBar } from "../Components/SearchBar"
import { Trending } from "../Components/Trending"
import { ErrorBoundary } from "../Components/ErrorBoundary"
import { ShootingStars } from "../Components/ui/shooting-stars"

export function Stream() {
    return <>
    <div class="min-h-screen bg-[#0C0516] overflow-x-hidden">
        <ShootingStars/>
        <ErrorBoundary>
            <SearchBar />
            <Trending />
        </ErrorBoundary>
    </div>
    </>
}