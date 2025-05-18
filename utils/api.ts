import { CreatePayload, DeletePayload, EditPayload, FetchPayload, GetOnePayload } from "@/types";

export interface ApiResponse<T> {
  data: T;
  error: string | null;
  count?: number;
}

type RequestOptions<Body> = {
  url?: string;
  body?: Body;
  responseType?: 'json' | 'text' | 'blob';
};


async function handleResponse<T>(res: Response, responseType: 'json' | 'text' | 'blob'): Promise<T> {
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `Request failed with status ${res.status}`);
  }

  switch (responseType) {
    case 'json':
      return res.json();
    case 'text':
      return res.text() as T;
    case 'blob':
      return res.blob() as T;
    default:
      throw new Error('Unsupported response type');
  }
}

export async function postRequest< Response = any>(
  { url='/api/create', body, responseType = 'json' }: RequestOptions<CreatePayload>
): Promise<Response> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return handleResponse<Response>(res, responseType);
}

export async function putRequest<Response = any>(
  { url='/api/edit', body, responseType = 'json' }: RequestOptions<EditPayload>
): Promise<Response> {
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return handleResponse<Response>(res, responseType);
}

export async function deleteRequest<Response = any>(
  { url='/api/delete', body, responseType = 'json' }: RequestOptions<DeletePayload>
): Promise<Response> {
  const res = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return handleResponse<Response>(res, responseType);
}

export async function getRequest< Response = any>(
  { url='/api/fetch', body, responseType = 'json' }: RequestOptions<FetchPayload>
): Promise<Response> {
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return handleResponse<Response>(res, responseType);
}

export async function getOneRequest< Response = any>(
  { url='/api/getOne', body, responseType = 'json' }: RequestOptions<GetOnePayload>
): Promise<Response> {
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return handleResponse<Response>(res, responseType);
}

type RequestOptionsPublic<Body> = {
  url: string;
  body?: Body;
  responseType?: 'json' | 'text' | 'blob';
};

// Used for other routes different from the predefined route types
export async function customPostRequest<Body = any, Response = any>(
  { url, body, responseType = 'json' }: RequestOptionsPublic<Body>
): Promise<Response> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return handleResponse<Response>(res, responseType);
}

export async function customGetRequest< Response = any>(
  { url='/api/fetch', body, responseType = 'json' }: RequestOptionsPublic<any>
): Promise<Response> {
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return handleResponse<Response>(res, responseType);
}