import React from "react";
import NotFoundPage from '../routes/NotFoundPage';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      console.error(error);
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        return <NotFoundPage />;
      }
  
      return this.props.children; 
    }
  }

export default ErrorBoundary;