import { queryOptions } from '@tanstack/react-query';
import { housesKeys } from './houses.keys';
import { housesApi } from '../api';

// TODO: Include count?
export const housesQueries = {
    all() {
        return queryOptions({
            queryKey: housesKeys.list(),
            queryFn: housesApi.getAll,
        });
    },
};
