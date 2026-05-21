import { queryOptions } from '@tanstack/react-query';
import { authKeys } from './auth.keys';
import { authApi } from '../api/auth.api';

export const authQueries = {
    session() {
        return queryOptions({
            queryKey: authKeys.session(),
            queryFn: authApi.getSession,
        });
    },
};
