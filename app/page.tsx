import Image from 'next/image';
import LoginForm from './components/login-form';
import logo from '../public/logo.svg';

export default function Home() {
    return (
        <div className='flex items-start justify-center h-screen py-12 sm:pt:20 px-6'>
            <div className='flex flex-col items-center text-center gap-6'>
                <div className='flex items-center gap-4'>
                    <Image
                        src={logo}
                        width={40}
                        height={40}
                        alt='Mindful logo'
                    />
                    <p className='font-medium text-3xl'>Mindful</p>
                </div>

                <p className='text-lg text-gray-600'>
                    Find stillness, Stay Mindful.
                </p>

                <h3 className='font-semibold text-2xl md:text-3xl max-w-md'>
                    Create calm, cultivate clarity, and reclaim your focus.
                </h3>

                <LoginForm />
            </div>
        </div>
    );
}
