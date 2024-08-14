import { useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
    const error = useRouteError() as Error

    return (
        <div className="auth">
            <div className="container">
                <form>
                    <h1>{error.name}</h1>
                    <h3>{error.message}</h3>
                </form>
            </div>
        </div>
    )
}
export default ErrorBoundary