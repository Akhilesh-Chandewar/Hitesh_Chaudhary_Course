'use client';

import { useAuthStore } from "@/store/auth"
import { useRouter } from 'next/navigation'
import React from "react";



const RegisterPage = () => {
    const createAccount = useAuthStore();
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>('');

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!name || !email || !password) {
            setError('Please fill in all fields.');
            setIsLoading(false);
            return;
        }

        const result = await createAccount.createAccount(name, email, password);
        setIsLoading(false);
        if (!result.success) {
            setError(result.error?.message || 'An error occurred while creating the account.');
        } else {
            router.push('/login')
        }
    };
    return (
        <div>RegisterPage</div>
    )
}

export default RegisterPage