import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";

/**
 * If a route is statically rendered, calling useSearchParams will cause the Client Component tree up to the closest Suspense boundary to be client-side rendered.
 * 
 */
const useParams = () => {

    const searchParams = useSearchParams();

    const router = useRouter();

    const getParam = (key: string): string | null => {

        return searchParams.get(key) ?? null;
    };

    const setParam = (queries: Array<{key: string, value: string}>) => {

        const params = new URLSearchParams(searchParams.toString());

        queries.forEach((query) => params.set(query.key, query.value));

        router.replace(`?${params.toString()}`, { scroll: false });
    };

    const deleteParam = (keys: string[]) => {

        const params = new URLSearchParams(searchParams.toString());

        keys.forEach((key) => params.delete(key))

        router.replace(`?${params.toString()}`, { scroll: false });
    }

    return {
        getParam,
        setParam,
        deleteParam
    }
};

export default useParams;