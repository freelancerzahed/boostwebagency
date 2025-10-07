"use client";

import { usePathname } from 'next/navigation';

const useIsActive = (href) => {
    const pathname = usePathname();
    return pathname === href;
};

export default useIsActive;
