import { signUpSchema } from '@casa/schemas';
import { Link } from '@tanstack/react-router';
import { useState, type SubmitEvent } from 'react';
import { handleEmailSignUp } from '@/modules/auth';
import { toast } from 'sonner';
import { validateWithZod } from '@/modules/zod';
import { FieldInput } from '@/components/ui';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { SocialSignIn } from './SocialSignIn';

export const SignUpForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const updateField =
        (key: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({ ...prev, [key]: e.target.value }));
        };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = validateWithZod(signUpSchema, form);

        if (!result.success) {
            setErrors(result.error.fields ?? {});
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
        <form onSubmit={handleSubmit}>
            <FieldSet>
                <FieldLegend>Create account</FieldLegend>
                <FieldDescription>
                    Enter your credentials below to create your account
                </FieldDescription>

                <FieldGroup>
                    <FieldInput
                        id="name"
                        label="Full Name"
                        value={form.name}
                        onChange={updateField('name')}
                        error={errors.name}
                        placeholder="John Doe"
                    />

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

                    <FieldInput
                        id="passwordConfirmation"
                        label="Confirm Password"
                        type="password"
                        value={form.passwordConfirmation}
                        onChange={updateField('passwordConfirmation')}
                        error={errors.passwordConfirmation}
                        placeholder="••••••••••••"
                    />

                    <Field>
                        <Button type="submit">Create account</Button>
                        <SocialSignIn />

                        <FieldDescription className="text-right">
                            <Link to="/sign-in">I already have an account</Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </form>
    );
};
