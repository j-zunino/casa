import { signInSchema } from "@casa/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { authHooks } from "../hooks";

import { Required } from "@/components/common/Required";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Controller } from "react-hook-form";
import { GitHubSignIn } from "./GitHubSignIn";

import type { z } from "zod";

type FormValues = z.infer<typeof signInSchema>;

// TODO: Forgot password
export const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { mutateAsync: signIn, isPending: isSigningIn } =
        authHooks.useSignInEmail();

    const form = useForm<FormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: FormValues) => {
        toast.promise(signIn(data), {
            loading: "Signing in...",
            success: "Successfully signed In",
            error: (err) => err?.message ?? "An unexpected error occurred",
        });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
                <FieldLegend>Sign In</FieldLegend>
                <FieldDescription>
                    Enter your credentials bellow to Sign In to your account
                </FieldDescription>

                <FieldGroup>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="email">
                                    Email <Required />
                                </FieldLabel>
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
                                    Password <Required />
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupInput
                                        {...field}
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        aria-invalid={fieldState.invalid}
                                        placeholder="••••••••••••"
                                        autoComplete="off"
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupButton
                                            aria-label="Show password"
                                            title="Show password"
                                            size="icon-xs"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeClosedIcon />
                                            ) : (
                                                <EyeIcon />
                                            )}
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Field>
                        <Button type="submit" disabled={isSigningIn}>
                            {isSigningIn ? (
                                <>
                                    <Spinner />
                                    Signing In
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                        <GitHubSignIn disabled={isSigningIn} />

                        <FieldDescription className="text-right">
                            <Link to="/sign-up">I don't have an account</Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </form>
    );
};
