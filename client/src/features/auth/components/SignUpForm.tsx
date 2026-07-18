import { signUpFormSchema } from "@casa/schemas";
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
import { Spinner } from "@/components/ui/spinner";
import { Link } from "@tanstack/react-router";
import { Controller } from "react-hook-form";
import { GitHubSignIn } from "./GitHubSignIn";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { EyeClosedIcon, EyeIcon } from "@phosphor-icons/react";
import type { z } from "zod";

type FormValues = z.infer<typeof signUpFormSchema>;

export const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { mutateAsync: signUp, isPending: isSigningUp } =
        authHooks.useSignUpEmail();

    const form = useForm<FormValues>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        },
    });

    const onSubmit = (data: FormValues) => {
        toast.promise(signUp(data), {
            loading: "Creating account...",
            success: "Account created successfully!",
            error: (err) => err?.message ?? "An unexpected error occurred",
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
                                    Full name <Required />
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

                    <Controller
                        name="passwordConfirmation"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="passwordConfirmation">
                                    Confirm password <Required />
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupInput
                                        {...field}
                                        id="passwordConfirmation"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        aria-invalid={fieldState.invalid}
                                        placeholder="••••••••••••"
                                        autoComplete="off"
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupButton
                                            aria-label="Show confirm password"
                                            title="Show confirm password"
                                            size="icon-xs"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword,
                                                )
                                            }
                                        >
                                            {showConfirmPassword ? (
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
                        <Button type="submit" disabled={isSigningUp}>
                            {isSigningUp ? (
                                <>
                                    <Spinner />
                                    Creating account...
                                </>
                            ) : (
                                "Create account"
                            )}
                        </Button>
                        <GitHubSignIn />

                        <FieldDescription className="text-right">
                            <Link to="/sign-in">I already have an account</Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </form>
    );
};
