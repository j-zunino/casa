import { Input } from './input';
import { Field, FieldDescription, FieldLabel } from './field';

type Props = {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    autoComplete?: string;
};

export const FieldInput = ({
    id,
    label,
    value,
    onChange,
    error,
    type = 'text',
    placeholder,
    autoComplete,
}: Props) => {
    const isInvalid = !!error;

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>

            <Input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                aria-invalid={isInvalid}
            />

            {isInvalid && (
                <FieldDescription className="text-destructive">
                    {error}
                </FieldDescription>
            )}
        </Field>
    );
};
