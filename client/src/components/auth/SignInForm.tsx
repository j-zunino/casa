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

            <span className="w-full justify-end flex">
                <Link
                    to="/sign-up"
                    className="text-surface-200 hover:underline"
                >
                    I don't have an account
                </Link>
            </span>

            <Button onClick={() => handleEmailSignIn(email, password)}>
                Sign In
            </Button>

            <hr className="border-surface-700" />

            <Button disabled variant="outline">
                Sign In with Google
            </Button>
            <Button disabled variant="outline">
                Sign In with GitHub
            </Button>
        </form>
    );
};
