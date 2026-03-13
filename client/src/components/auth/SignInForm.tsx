import { Link } from '@tanstack/react-router';
import { useState, type SubmitEvent } from 'react';
import { handleEmailSignIn } from '../../modules/auth';
import { Button, Input } from '../ui';
import toast from '../../modules/toast';

export const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.promise(handleEmailSignIn(email, password), {
            loading: 'Signing in...',
            success: 'Successfully signed In',
            error: (err) => err.message,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                type="email"
                placeholder="me@example.com"
            />
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
                placeholder="Password"
            />

            <span className="flex w-full justify-end">
                <Link
                    to="/sign-up"
                    className="text-secondary-8 hover:underline"
                >
                    I don't have an account
                </Link>
            </span>

            <Button type="submit">Sign In</Button>

            <hr className="border-secondary-6" />

            <Button disabled variant="outline">
                Sign In with Google
            </Button>
            <Button disabled variant="outline">
                Sign In with GitHub
            </Button>
        </form>
    );
};
