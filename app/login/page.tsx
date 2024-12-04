'use client';

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const {data: session, status} = useSession();
    const router = useRouter()

    const params = useSearchParams()

    const error = params.get("error");

    useEffect(() => {
        if (session) {
          router.push("/dashboard");
        }
      }, [session, status, router]);

    if (status === "loading") {
        return <div className="my-3">Loading ... </div>;
    }

    if (!session) {
        return (
            <div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">You must sign in</h2>
                <button
                    data-cy="login-button"
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => signIn("keycloak", {callbackUrl: '/dashboard'})}
                >
                    Sign in
                </button>
            </div>
        )
    }

    
}