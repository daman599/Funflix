import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div className="min-h-screen flex items-center justify-center text-center">
                <p className="text-gray-600 text-lg sm:text-xl font-semibold">
                    Something went wrong, please try again later.
                </p>
            </div>
        }
        return this.props.children;
    }
}

