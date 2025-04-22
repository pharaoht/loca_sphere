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

    const setParam = (key: string, value: string) => {

        const params = new URLSearchParams(searchParams);

        params.set(key, value);

        router.replace(`?${params.toString()}`, { scroll: false });
    };

    return {
        getParam,
        setParam
    }
};

export default useParams;