'use client';

import { useState, useId } from 'react';

import { FaArrowRight, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Field from './field';
import Confetti from 'react-confetti';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        general: '',
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });
    const [showConfetti, setShowConfetti] = useState(false);

    const emailId = useId();
    const passwordId = useId();

    const validateEmail = (email: string): string => {
        if (!email) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(email)
            ? 'Please enter a valid email address'
            : '';
    };

    const validatePassword = (password: string): string => {
        if (!password) return 'Password is required';
        return password.length < 6
            ? 'Password must be at least 6 characters'
            : '';
    };

    const handleChange =
        (
            setter: React.Dispatch<React.SetStateAction<string>>,
            validator: (value: string) => string,
            key: keyof typeof touched
        ) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setter(value);
            if (touched[key]) {
                setErrors((prev) => ({
                    ...prev,
                    [key]: validator(value),
                }));
            }
        };

    const handleBlur =
        (
            value: string,
            validator: (value: string) => string,
            key: keyof typeof touched
        ) =>
        () => {
            setTouched((prev) => ({ ...prev, [key]: true }));
            setErrors((prev) => ({
                ...prev,
                [key]: validator(value),
            }));
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        setTouched({ email: true, password: true });
        setErrors({
            email: emailError,
            password: passwordError,
            general: '',
        });

        if (emailError || passwordError) return;

        setIsLoading(true);
        setErrors({ email: '', password: '', general: '' });

        try {
            const response = await mockFetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
            setIsLoading(false);

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
            setEmail('');
            setPassword('');
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        } catch (err) {
            setErrors({
                email: '',
                password: '',
                general: 'Invalid credentials.',
            });
            console.log(errors);
            setIsLoading(false);
        }
    };

    const mockFetch = (url: string, options: RequestInit) => {
        return new Promise<Response>((resolve) => {
            setTimeout(() => {
                const { email, password } = JSON.parse(options.body as string);

                if (email === 'demo@example.com' && password === 'password') {
                    resolve(
                        new Response(
                            JSON.stringify({ message: 'Login successful' }),
                            {
                                status: 200,
                                headers: { 'Content-Type': 'application/json' },
                            }
                        )
                    );
                } else {
                    resolve(
                        new Response(
                            JSON.stringify({ error: 'Invalid credentials' }),
                            {
                                status: 401,
                                headers: { 'Content-Type': 'application/json' },
                            }
                        )
                    );
                }
            }, 1000);
        });
    };

    const isFormValid = !validateEmail(email) && !validatePassword(password);

    return (
        <div className='w-full max-w-md mx-auto mt-4'>
            <div className='flex items-center gap-6 space-x-6 justify-center'>
                <button className='flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition cursor-pointer'>
                    <FcGoogle className='mr-2 text-lg text-[#DB4437]' />
                    <span className='text-sm font-medium text-gray-700'>
                        Google
                    </span>
                </button>

                <button className='flex items-center px-4 py-2 border border-black rounded-md bg-black hover:bg-gray-800 transition cursor-pointer'>
                    <FaGithub className='mr-2 text-lg text-white' />
                    <span className='text-sm font-medium text-white'>
                        Github
                    </span>
                </button>
            </div>
            <div className='mx-auto w-24 h-[0.3px] bg-gray-400 mt-6 mb-12'></div>

            <form onSubmit={handleSubmit} className='space-y-6' noValidate>
                <Field
                    id={emailId}
                    label='Email address'
                    type='email'
                    value={email}
                    onChange={handleChange(setEmail, validateEmail, 'email')}
                    onBlur={handleBlur(email, validateEmail, 'email')}
                    error={errors.email}
                    touched={touched.email}
                    placeholder='Enter your email'
                    name='email'
                    required
                    autoComplete='username'
                    inputMode='email'
                />

                <Field
                    id={passwordId}
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handleChange(
                        setPassword,
                        validatePassword,
                        'password'
                    )}
                    onBlur={handleBlur(password, validatePassword, 'password')}
                    error={errors.password}
                    touched={touched.password}
                    placeholder='Enter your password'
                    toggleVisibility={() => setShowPassword(!showPassword)}
                    showToggle
                    showPassword={showPassword}
                    name='password'
                    required
                    autoComplete='current-password'
                />

                <button
                    type='submit'
                    disabled={!isFormValid || isLoading}
                    className={`
                        w-full flex items-center justify-center gap-2 px-4 py-3 
                        bg-blue-500 text-white font-semibold rounded-lg
                        transition-all duration-300 group-enabled:hover:bg-blue-600
                        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-blue-400
                        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group
                        ${isLoading ? 'animate-pulse' : ''}
                    `}>
                    {isLoading ? (
                        <>
                            <div className='w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin' />
                            Signing in...
                        </>
                    ) : (
                        <>
                            Sign in{' '}
                            <FaArrowRight
                                className={`w-5 h-5 transform transition-transform duration-200 ${
                                    !isFormValid || isLoading
                                        ? ''
                                        : 'group-hover:translate-x-1'
                                }`}
                            />
                        </>
                    )}
                </button>

                <p className='text-red-400 pt-1'>
                    {errors.general && errors.general}
                </p>

                <div className='text-center'>
                    <button
                        type='button'
                        onClick={() =>
                            alert(
                                'Forgot password flow would be implemented here'
                            )
                        }
                        className='text-sm text-primary hover:text-primary-glow transition-colors duration-200 hover:underline focus:outline-none focus:underline cursor-pointer'>
                        Forgot your password?
                    </button>
                </div>
            </form>
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    gravity={0.9}
                    numberOfPieces={300}
                    initialVelocityY={35}
                    wind={0.01}
                />
            )}

            <div className='my-6 p-4   rounded-lg border border-border/30'>
                <p className='text-xs  text-center'>
                    Demo: Use{' '}
                    <span className='font-mono text-primary'>
                        demo@example.com
                    </span>{' '}
                    / <span className='font-mono text-primary'>password</span>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
