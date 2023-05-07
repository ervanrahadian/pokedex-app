import { useEffect } from "react";
import { useRouter } from "next/router";
import { ROUTES_PATH } from "@constants/config";
import { isEmpty } from "@utils/validation";

export const useDefaultLocale = (): void => {
    const router = useRouter();
    const { asPath, defaultLocale, locale, pathname, query } = router;

    useEffect(() => {
        if (
            locale === defaultLocale &&
            pathname !== ROUTES_PATH.page_404 &&
            isEmpty(query)
        ) {
            router.push(`/${locale}${asPath}`, undefined, {
                locale: false,
                shallow: true,
            });
        }
    }, [locale, asPath]);
};
