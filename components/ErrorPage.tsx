import Link from 'next/link';
import { useRouter } from 'next/router';
import NavBar from './NavBar';
import SelectorSquare from './selector/SelectorSquare';

const ErrorMessage = ({ errorMessage }) => {
    const router = useRouter();

    const handleGoBack = () => {
        if (router.pathname === '/') {
            // If user is already on the home page, no need to go back
            return;
        }
        router.back();
    };

    return (
        <>
            <NavBar />
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                <div className="p-8 bg-gray-800 rounded-md shadow-lg">
                    <h1 className="text-red-400 text-2xl font-bold">{errorMessage}</h1>
                    <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleGoBack}>
                        Go Back
                    </button>
                </div>
            </div>
        </>
    );
};

export default ErrorMessage;