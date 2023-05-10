import React from "react";
interface ErrorProps{
    children: React.ReactNode,
    fallback: React.ReactNode
}
interface ErrorState {
    hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
    constructor(props){
        super(props);
        this.state = {hasError: false}
    }

    static getDerivedStateFromError(error){
        return {hasError: true}
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error('%cError in ErrorBoundary catched: ', "color: #ff0000", error);
    }

    render(): React.ReactNode {
        if (this.state.hasError){
            return (
                <div className="flex place-content-center text-2xl my-auto">
                    {this.props.fallback}
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary;