"use client"

import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"

export const LoginButton = () => {
    const router = useRouter();
    return(
        <Button onClick={() => router.push("/auth/signin")}>
            Sign in
        </Button>
    )
} 