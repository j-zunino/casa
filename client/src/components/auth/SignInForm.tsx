import { signInSchema } from '@casa/schemas';
import { Link } from '@tanstack/react-router';
import { useState, type SubmitEvent } from 'react';
import { handleEmailSignIn } from '../../modules/auth';
import toast from '../../modules/toast';
import { validateWithZod } from '../../modules/zod';
import { FieldInput } from '../ui';
import { Button } from '../ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    FieldSet,
} from '../ui/field';
import { SocialSignIn } from './SocialSignIn';

// TODO: Forgot password
export const SignInForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const updateField =
        (key: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({ ...prev, [key]: e.target.value }));
        };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = validateWithZod(signInSchema, form);

        if (!result.success) {
            setErrors(result.error.fields ?? {});
            return;
        }

        setErrors({});

        toast.promise(
            handleEmailSignIn(result.data.email, result.data.password),
            {
                loading: 'Signing in...',
                success: 'Successfully signed In',
                error: (err) => err.message,
            },
        );
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FieldSet>
                    <FieldLegend>Create account</FieldLegend>
                    <FieldDescription>
                        Enter your credentials bellow to Sign In to your account
                    </FieldDescription>

                    <FieldGroup>
                        <FieldInput
                            id="email"
                            label="Email"
                            type="email"
                            value={form.email}
                            onChange={updateField('email')}
                            error={errors.email}
                            placeholder="me@example.com"
                        />

                        <FieldInput
                            id="password"
                            label="Password"
                            type="password"
                            value={form.password}
                            onChange={updateField('password')}
                            error={errors.password}
                            placeholder="••••••••••••"
                        />

                        <Field>
                            <Button type="submit">Sign In</Button>
                            <SocialSignIn />

                            <FieldDescription className="text-right">
                                <Link to="/sign-up">
                                    I don't have an account
                                </Link>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </form>
        </>
    );
};
