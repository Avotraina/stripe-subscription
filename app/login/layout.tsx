import React from "react";

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
				{children}
			</div>
		</div>
    )
}