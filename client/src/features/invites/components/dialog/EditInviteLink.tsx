import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FloppyDiskIcon } from '@phosphor-icons/react';

export const EditInviteLink = () => {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Invite house settings</DialogTitle>
            </DialogHeader>

            <form>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Max number of uses</FieldLabel>
                        <Select defaultValue="null">
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="null">
                                        No limit
                                    </SelectItem>
                                    <SelectItem value="1">1 use</SelectItem>
                                    <SelectItem value="5">5 uses</SelectItem>
                                    <SelectItem value="10">10 uses</SelectItem>
                                    <SelectItem value="50">50 uses</SelectItem>
                                    <SelectItem value="100">
                                        100 uses
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>

                    <Field>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="w-full">
                            <FloppyDiskIcon weight="fill" />
                            Save
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </>
    );
};
