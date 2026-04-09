import { FieldInput } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldSet } from '@/components/ui/field';
import { handleHouseCreation } from '@/modules/house';
import { validateWithZod } from '@/modules/zod';
import { houseSchema } from '@casa/schemas';
import { useState, type SubmitEvent } from 'react';
import { toast } from 'sonner';

export const CreateHouseForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [form, setForm] = useState({
        name: '',
    });

    const updateField =
        (key: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({ ...prev, [key]: e.target.value }));
        };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = validateWithZod(houseSchema, form);

        if (!result.success) {
            setErrors(result.error.fields ?? {});
            return;
        }

        setErrors({});

        toast.promise(handleHouseCreation(result.data.name), {
            loading: 'Creating house...',
            success: 'House created successfully!',
            error: (err) => err.message,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <FieldSet>
                <FieldGroup>
                    <FieldInput
                        id="house"
                        label="House Name"
                        value={form.name}
                        onChange={updateField('name')}
                        error={errors.name}
                        placeholder="My House"
                    />

                    <Field>
                        <Button type="submit">Create</Button>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </form>
    );
};
