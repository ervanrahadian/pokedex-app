import { useState, useLayoutEffect } from "react";

import { canUseDOM } from "@helpers/env";

export const useScreenSize = (param?: number): boolean => {
    const width = param ? param : 991;
    const [isMobile, setIsMobile] = useState(false);

    if (canUseDOM) {
        useLayoutEffect(() => {
            const handleResize = () => {
                if (window.innerWidth >= width) setIsMobile(false);
                else setIsMobile(true);
            };
            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        }, [param]);
    }
    return isMobile;
};
