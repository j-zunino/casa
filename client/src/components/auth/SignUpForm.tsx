import { signUpSchema } from '@casa/shared';
import { Link } from '@tanstack/react-router';
import { useState, type SubmitEvent } from 'react';
import { handleEmailSignUp } from '../../modules/auth';
import toast from '../../modules/toast';
import { Button, Input } from '../ui';

export const SignUpForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = signUpSchema.safeParse({
            name,
            email,
            password,
            passwordConfirmation,
        });

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};

            result.error.issues.forEach((err) => {
                const field = err.path[0] as string;
                fieldErrors[field] = err.message;
            });

            setErrors(fieldErrors);

            return;
        }

        setErrors({});

        toast.promise(
            handleEmailSignUp(
                result.data.name,
                result.data.email,
                result.data.password,
            ),
            {
                loading: 'Creating account...',
                success: 'Account created successfully!',
                error: (err) => err.message,
            },
        );
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({ ...prev, name: '' }));
                }}
                label="Full Name"
                type="text"
                placeholder="John Doe"
                error={errors.name}
            />
            <Input
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: '' }));
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
            <Input
                value={passwordConfirmation}
                onChange={(e) => {
                    setPasswordConfirmation(e.target.value);
                    setErrors((prev) => ({
                        ...prev,
                        passwordConfirmation: '',
                    }));
                }}
                label="Confirm password"
                type="password"
                placeholder="Confirm password"
                error={errors.passwordConfirmation}
            />

            <span className="flex w-full justify-end">
                <Link
                    to="/sign-in"
                    className="text-secondary-8 hover:underline"
                >
                    I already have an account
                </Link>
            </span>

            <Button>Sign Up</Button>
        </form>
    );
};
