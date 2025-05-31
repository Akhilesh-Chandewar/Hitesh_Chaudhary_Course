'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyEmailPage = () => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const verifyEmail = async (token: string) => {
        try {
            console.log('Verifying email with token:', token);
            const response = await axios.get('/api/users/verify', {
                params: { token }
            });
            console.log('Verification response:', response.data);
            if (response.status === 200) {
                setVerified(true);
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            }
        } catch (err) {
            console.error('Verification failed:', err);
            setError('Verification failed. Please check your link or try again later.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');
        if (tokenFromUrl) {
            verifyEmail(tokenFromUrl);
        } else {
            setError('No verification token provided.');
            setLoading(false);
        }
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (verified) {
        return <div className="text-green-500">Your email has been successfully verified! Redirecting to login...</div>;
    }
    return <div className="text-blue-500">Verifying your email...</div>;
};

export default VerifyEmailPage;
