/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback, useState } from 'react';
import useDataProvider from './useDataProvider';

export interface Mutation {
    type: string;
    resource: string;
    payload: object;
}

export interface MutationOptions {
    action?: string;
    onSuccess?: (response: any) => any | Object;
    onFailure?: (error?: any) => any | Object;
    [key: string]: any;
}

export type UseMutationValue = [
    (
        query?: Partial<Mutation>,
        options?: Partial<MutationOptions>
    ) => void | Promise<any>,
    {
        data?: any;
        total?: number;
        error?: any;
        loading: boolean;
        loaded: boolean;
    }
];

/**
 * 更新数据
 *
 * @param query
 * @param options
 * @param {string} options.action
 * @param {Function} options.onSuccess
 * @param {Function} options.onFailure
 *
 * @returns
 *
 * @example
 *
 * import { useMutation } from '@stbui/prophet-core';
 *
 * const UserProfile = record => {
 *     const [update, { data, loading, error }] = useMutation({
 *         type: 'UPDATE',
 *         resource: 'users',
 *         payload: { id: record.id, data: { username: 'stbui' } },
 *     });
 *
 *     if (loading) {
 *         return 'loading';
 *     }
 *
 *     if (error) {
 *         return error.message;
 *     }
 *
 *     return <div onClick={update}>{data.username}</div>;
 * };
 *
 * const UserProfile = record => {
 *     const [update, { data, loading, error }] = useMutation({
 *         type: 'UPDATE',
 *         resource: 'users',
 *         payload: { id: record.id, data: { username: 'stbui' } },
 *     });
 *
 *     if (loading) {
 *         return 'loading';
 *     }
 *
 *     if (error) {
 *         return error.message;
 *     }
 *
 *     return (
 *         <div onClick={() => update(null, { data: { updateAt: new Date() } })}>
 *             {data.username}
 *         </div>
 *     );
 * };
 */
const useMutation = (
    query: Mutation,
    options: MutationOptions
): UseMutationValue => {
    const { type, resource, payload } = query;
    const [state, setState]: any = useState({
        data: null,
        total: null,
        error: null,
        loading: false,
        loaded: false,
    });

    const dataProvider = useDataProvider();

    const mutate = useCallback(
        (callTimeQuery: any, callTimeOptions: any = {}) => {
            setState(prevState => ({ ...prevState, loading: true }));

            dataProvider(
                type,
                resource,
                { ...payload, ...callTimeQuery },
                {
                    ...options,
                    ...callTimeOptions,
                }
            )
                .then(({ data, total }) => {
                    setState({
                        data,
                        total,
                        loading: false,
                        loaded: true,
                    });
                })
                .catch(error => {
                    setState({
                        error,
                        loading: false,
                        loaded: false,
                    });
                });
        },
        [dataProvider, JSON.stringify({ query, options })]
    );

    return [mutate, state];
};

export default useMutation;
