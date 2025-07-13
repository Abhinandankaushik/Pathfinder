import React from 'react';

class ErrorBoundary extends React.Component {
    state = { error: null };

    static getDerivedStateFromError(error) {
        return { error: error.message };
    }

    render() {
        if (this.state.error) {
            return (
                <div className="text-red-600 p-4 text-center">
                    <h2>Error: {this.state.error}</h2>
                    <p>Please refresh the page or try again later.</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;