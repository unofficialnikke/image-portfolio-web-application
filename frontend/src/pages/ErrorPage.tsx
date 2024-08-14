import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="auth">
            <div className="container">
                <form>
                    <h1>Oops!</h1>
                    <h3>Page not found!</h3>
                    <button onClick={() => navigate('/')}>Go back</button>
                </form>
            </div>
        </div>
    )
}

export default ErrorPage