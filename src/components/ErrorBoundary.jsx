import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{
          padding: '2rem',
          backgroundColor: '#2a0a0a',
          color: '#ffaaaa',
          border: '1px solid #ff0000',
          borderRadius: '8px',
          margin: '1rem',
          fontFamily: 'monospace'
        }}>
          <h2>Something went wrong in this section.</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
            <summary>Click for error details</summary>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
