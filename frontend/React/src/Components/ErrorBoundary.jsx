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
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white text-center px-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-red-400 mb-4">
            Something went wrong 😢
          </h1>
          <p className="text-base sm:text-lg text-gray-300">
            Please try again after some time.
          </p>
        </div>
      </div>
        }

        return this.props.children;
    }
}

