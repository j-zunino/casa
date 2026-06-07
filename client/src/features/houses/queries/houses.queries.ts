import { queryOptions } from '@tanstack/react-query';
import { housesKeys } from './houses.keys';
import { housesApi } from '../api';

import type { House } from '../types';

export const housesQueries = {
    // TODO: Include count?
    all() {
        return queryOptions({
            queryKey: housesKeys.list(),
            queryFn: housesApi.getAll,
        });
    },

    details(slug: House['slug']) {
        return queryOptions({
            queryKey: housesKeys.details(slug),
            queryFn: () => housesApi.getDetails(slug),
        });
    },
};
