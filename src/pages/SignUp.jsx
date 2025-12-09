import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth();
    const db = getDatabase();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters!');
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await set(ref(db, `users/${user.uid}`), {
                email: user.email,
                ownedPlants: [],
                coins: 500,
                water: 0,
                createdAt: new Date().toISOString()
            });

            navigate('/');
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError('This email is already registered. Please log in instead.');
            } else {
                setError('Failed to create account. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] bg-gradient-to-b from-white to-bg-gradient px-4 py-8">
            <div className="flex flex-col lg:flex-row-reverse bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full">

                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-nav-bg to-card-bg p-12 items-center justify-center">
                    <div className="text-center">
                        <div className="w-64 h-64 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <img
                                src="public/plant-icon.png"
                                alt="A cute potted plant"
                                className="size-48 object-contain"
                            />
                        </div>
                        <h2 className="text-3xl font-bold text-nav-text mb-4">Start Growing Today!</h2>
                        <p className="text-nav-text/80">Join FocusGrow and cultivate your productivity</p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-8 sm:p-12">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-nav-text mb-2">Sign Up</h2>
                        <p className="text-gray-600">Create your account to start your garden</p>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-nav-text mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSignUp(e)}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-accent focus:outline-none transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-nav-text mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSignUp(e)}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-accent focus:outline-none transition-colors pr-12"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-nav-text mb-2">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSignUp(e)}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-accent focus:outline-none transition-colors pr-12"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleSignUp}
                            disabled={loading}
                            className="w-full bg-accent text-white py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-600 mt-8">
                        Already have an account?{' '}
                        <Link to="/login" className="text-accent font-semibold hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}