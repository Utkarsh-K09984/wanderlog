import { useAuthStore } from '../lib/authStore';

function Journal() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    return (
        <>
            {isLoggedIn ? (
                <div className="min-h-[80vh] w-full flex items-center justify-center px-4 md:px-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Your Travel Journals</h1>
                    {/* Add journal list or content here */}
                </div>
            ) : (
                <div className="min-h-[80vh] w-full bg-background flex items-center justify-center px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto gap-10">
                        {/* Left: Illustration */}
                        <div className="flex-1 flex items-center justify-center">
                            <div className="w-[340px] h-[260px] bg-primary/10 rounded-full flex items-center justify-center">
                                <img
                                    src="https://undraw.co/api/illustrations/undraw_traveling_yhxq.svg"
                                    alt="Travel Illustration"
                                    className="w-60 h-60 object-contain"
                                />
                            </div>
                        </div>
                        {/* Right: Sign in prompt */}
                        <div className="flex-1 flex flex-col items-start justify-center gap-6">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                                Sign in please !!
                            </h1>
                            <div className="flex gap-4 mt-2">
                                <a
                                    href="/login"
                                    className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition"
                                >
                                    Sign In
                                </a>
                                <a
                                    href="/about"
                                    className="px-6 py-2 rounded-md border border-border text-foreground font-semibold hover:bg-accent transition"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Journal;