import { Trending } from "../Components/Trending"
import { ErrorBoundary } from "../Components/helper/ErrorBoundary"

export function Stream() {
    return <>
        <div class="min-h-screen bg-[#0C0516] overflow-x-hidden">
            <ErrorBoundary>
                <Trending />
            </ErrorBoundary>
        </div>
    </>
}