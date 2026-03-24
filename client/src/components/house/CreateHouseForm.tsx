import { houseSchema } from '@casa/schemas';
import { useState, type SubmitEvent } from 'react';
import { handleHouseCreation } from '../../modules/house';
import toast from '../../modules/toast';
import { validateWithZod } from '../../modules/zod';
import { Button, Input } from '../ui';

export const CreateHouseForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [name, setName] = useState('');

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = validateWithZod(houseSchema, { name });

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
            <Input
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({ ...prev, name: '' }));
                }}
                label="House Name"
                type="text"
                placeholder="My House"
                error={errors.name}
            />

            <Button type="submit">Create House</Button>
        </form>
    );
};
