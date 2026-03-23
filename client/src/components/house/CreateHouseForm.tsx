import { houseSchema } from '@casa/schemas';
import { useState, type SubmitEvent } from 'react';
import { handleHouseCreation } from '../../modules/house';
import { Button, Input } from '../ui';

export const CreateHouseForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [name, setName] = useState('');

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = houseSchema.safeParse({
            name,
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

        handleHouseCreation(name);
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
