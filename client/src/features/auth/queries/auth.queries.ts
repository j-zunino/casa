import { queryOptions } from '@tanstack/react-query';
import { authApi } from '../api';
import { authKeys } from './auth.keys';

export const authQueries = {
    session() {
        return queryOptions({
            queryKey: authKeys.session(),
            queryFn: authApi.getSession,
        });
    },
};
