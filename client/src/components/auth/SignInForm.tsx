import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { handleEmailSignIn } from '../../modules/auth';
import { Button, Input } from '../ui';

export const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2"
        >
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

            <Button onClick={() => handleEmailSignIn(email, password)}>
                Sign In
            </Button>

            <hr className="border-secondary-6" />

            <Button variant="outline">Sign In with Google</Button>
            <Button variant="outline">Sign In with GitHub</Button>
        </form>
    );
};
