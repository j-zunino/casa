import { AppError } from '@/utils';
import { ErrorCodes } from '@casa/types';

export const mapAuthError = (err: any) => {
    const code = err?.body.code;

    switch (code) {
        case 'ORGANIZATION_ALREADY_EXISTS':
            throw new AppError(
                'House already exists',
                409,
                ErrorCodes.CONFLICT,
            );

        default:
            throw err;
    }
};
