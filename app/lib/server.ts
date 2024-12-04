
export const get = async <T = Record<string, unknown>> (url: string) => {
    const response = await fetch(url);
    return await sendResponse<T>(response);
}

export const post = async <T> (url: string, data: unknown) => {
    const body = JSON.stringify(data);
    const response = await fetch(url, {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
        },
        body: body
    });

    return await sendResponse<T>(response);
}

const sendResponse = async <T>(response: Response): Promise<T> => {
	const json = await response.json();
	return json.response;
};

export const patch = async <T = Record<string, unknown>>(url: string, data: any) => {
	const response = await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return await sendResponse<T>(response);
};