import { Link } from "react-router-dom"

export function Landing() {
    return <div style={{ backgroundColor: "grey", height: "100vh" }}>
        <div>
            <h1>All streaming platforms</h1>
            <h3>One Hub</h3>
        </div>
        <div>Tired of jumping between apps? Us too !</div>
        <div>Find where to watch your favorite movies in One search</div>
        <div>
            <Link to="/stream">No more guessing ! just stream</Link>
        </div>
        <h3>Or</h3>
        <div>Sign in for better experience</div>
    </div>
}