import { signUpFormSchema } from '@casa/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { authHooks } from '../hooks';

import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Link } from '@tanstack/react-router';
import { Controller } from 'react-hook-form';
import { SocialSignIn } from './SocialSignIn';

type FormValues = z.infer<typeof signUpFormSchema>;

export const SignUpForm = () => {
    const { mutateAsync: signUp, isPending: isSigningUp } =
        authHooks.useEmailSignUp();

    const form = useForm<FormValues>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        },
    });

    const onSubmit = (data: FormValues) => {
        toast.promise(signUp(data), {
            loading: 'Creating account...',
            success: 'Account created successfully!',
            error: (err) => err.message,
        });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
                <FieldLegend>Create account</FieldLegend>
                <FieldDescription>
                    Enter your credentials below to create your account
                </FieldDescription>

                <FieldGroup>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="name">
                                    Full name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="name"
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="John Doe"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    {...field}
                                    id="email"
                                    type="email"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="me@example.com"
                                    autoComplete="on"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="password"
                                    type="password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="••••••••••••"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="passwordConfirmation"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="passwordConfirmation">
                                    Confirm password
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="passwordConfirmation"
                                    type="password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="••••••••••••"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Field>
                        <Button type="submit" disabled={isSigningUp}>
                            {isSigningUp ? (
                                <>
                                    <Spinner />
                                    Creating account...
                                </>
                            ) : (
                                'Create account'
                            )}
                        </Button>
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
