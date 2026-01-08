import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * If a route is statically rendered, calling useSearchParams will cause the Client Component tree up to the closest Suspense boundary to be client-side rendered.
 * 
 */
const useParams = () => {

    const searchParams = useSearchParams();

    const pathName = usePathname();

    const router = useRouter();

    const getCurrentUrl = () => {

        const query = searchParams.toString();

        const currentUrl = query ? `${pathName}?${query}` : pathName

        return currentUrl;
    }

    const getParam = (key: string): string | null => {

        return searchParams.get(key) ?? null;
    };

    const setParam = (queries: Array<{key: string, value: string}>) => {

        const params = new URLSearchParams(window.location.search);
        
        queries.forEach((query) => params.set(query.key, query.value));

        router.replace(`?${params.toString()}`, { scroll: false });

    }

    const deleteParam = (keys: string[]) => {

        const params = new URLSearchParams(searchParams.toString());

        keys.forEach((key) => params.delete(key))

        router.replace(`?${params.toString()}`, { scroll: false });
    }

    function parseUrlDate(param?: string) {
    
        if (!param) return null;

        const parts = param.split("-");

        if (parts.length == 3) return parts;

        const x = param.split('/');

        if(x.length == 3) return x;

        return null;
    }


    return {
        getParam,
        setParam,
        deleteParam,
        parseUrlDate,
        getCurrentUrl,
        router
    }
};

export default useParams;