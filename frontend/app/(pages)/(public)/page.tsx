'use client';
const LandingPage = () => {
  
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <header className="w-full bg-blue-600 text-white py-4 shadow-md">
                <div className="container mx-auto text-center">
                    <h1 className="text-3xl font-bold">University Chat</h1>
                </div>
            </header>
            <main className="flex-grow container mx-auto px-4 py-8 text-center">
                <h2 className="text-4xl font-bold mb-4">Welcome to University Chat</h2>
                <p className="text-lg text-gray-700 mb-6">
                    Connect with your peers, share knowledge, and grow together.
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
                    Get Started
                </button>
            </main>
            <footer className="w-full bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} University Chat. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};
export default LandingPage