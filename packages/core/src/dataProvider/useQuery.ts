import { useEffect, useState } from 'react'
import useDataProvider from './useDataProvider'

const useQuery = (query, options = {}) => {
    const { type, resource, payload } = query;
    const [state, setState]: any = useState({
        data: undefined,
        error: null,
        total: null,
        loading: true,
        loaded: false,
    })

    const dataProvider = useDataProvider();

    useEffect(() => {
        dataProvider(type, resource, payload, options)
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
    }, [dataProvider, JSON.stringify({ query, options })])


    return state
}

export default useQuery