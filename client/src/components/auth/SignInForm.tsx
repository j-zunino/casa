import { signInSchema } from '@casa/schemas';
import { Link } from '@tanstack/react-router';
import { useState, type SubmitEvent } from 'react';
import { handleEmailSignIn } from '../../modules/auth';
import toast from '../../modules/toast';
import { validateWithZod } from '../../modules/zod';
import { Button, Input } from '../ui';

// TODO: Forgot password
export const SignInForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = validateWithZod(signInSchema, {
            email,
            password,
        });

        if (!result.success) {
            setErrors(result.error.fields ?? {});
            return;
        }

        setErrors({});
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
                onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, name: '' }));
                }}
                label="Email"
                type="email"
                placeholder="me@example.com"
                error={errors.email}
            />
            <Input
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: '' }));
                }}
                label="Password"
                type="password"
                placeholder="Password"
                error={errors.password}
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
        </form>
    );
};
