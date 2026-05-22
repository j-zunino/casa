import { queryOptions } from '@tanstack/react-query';
import { housesKeys } from './houses.keys';
import { housesApi } from '../api';

import type { House } from '../types';

// TODO: Include count?
export const housesQueries = {
    all() {
        return queryOptions({
            queryKey: housesKeys.list(),
            queryFn: housesApi.getAll,
        });
    },

    details(input: { id: House['id'] } | { slug: House['slug'] }) {
        return queryOptions({
            queryKey: housesKeys.details(input),
            queryFn: () => housesApi.getDetails(input),
        });
    },
};
