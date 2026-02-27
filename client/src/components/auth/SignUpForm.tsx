import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Button, Input } from '../ui';
import { handleEmailSignUp } from '../../modules/auth';

// TODO: Add password confirmation
export const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2"
        >
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
                type="text"
                placeholder="John Doe"
            />
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
                    to="/sign-in"
                    className="text-surface-200 hover:underline"
                >
                    I already have an account
                </Link>
            </span>

            <Button onClick={() => handleEmailSignUp(name, email, password)}>
                Sign Up
            </Button>
        </form>
    );
};
