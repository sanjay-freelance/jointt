import { useEffect, useState } from 'react';

function handleErrors(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}


function ajaxFetch({url, method, data}){
	const body = data ? JSON.stringify(data) : null;
	const headerOptions = {
		'content-type': 'application/json',
		'Accept':'application/json'
	};
	const headers = new Headers(headerOptions);
	const fetchOptions = { method, body, headers};
	return fetch(url,fetchOptions)
	.then(handleErrors)
	.then(function(response) {
		if(response.redirected){
			window.location.replace(response.url);
			return response.url
		} else {
			return response.json();
		}
	})
}


export default function useRequest(request, responseHandler) {
	const {url, method, data} = request;
	const [loading, setLoading] = useState(!!request);

	useEffect(() => {
			if (request && request.url) {
				loadData();
			}
		}, [url, method, data]);

	function loadData() {
		if (!request) {
			return;
		}
		setLoading(true);

		if (request.method === 'GET' && request.data) {
			delete request.data;
		}

		ajaxFetch(request)
		.then(response => {
			responseHandler(response)
		}).catch((error) => {
			setLoading(false);
			responseHandler(undefined, error)
		})
		.finally(() => {
			setLoading(false);
		});
	}

	return loading;
}
