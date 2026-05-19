import { houseSchema } from '@casa/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { handleHouseCreation } from '../services';

import { Button } from '@/components/ui/button';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input.tsx';
import { Controller } from 'react-hook-form';

type FormValues = z.infer<typeof houseSchema>;

export const CreateHouseForm = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(houseSchema),
        defaultValues: { name: '' },
    });

    const onSubmit = (data: FormValues) => {
        toast.promise(handleHouseCreation(data.name), {
            loading: 'Creating house...',
            success: 'House created successfully!',
            error: (err) => err.message,
        });
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
        >
            <FieldSet>
                <FieldGroup>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="name">
                                    House name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="name"
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="My house"
                                    autoComplete="on"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Field>
                        <Button type="submit">Create</Button>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </form>
    );
};
