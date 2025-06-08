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
         return <div className="flex items-center justify-center text-center min-h-[50vh] px-4">
                  <p className="text-white text-lg sm:text-xl font-medium">
                    Something went wrong, please try again later.
                 </p>
                </div>
        }

        return this.props.children;
    }
}

