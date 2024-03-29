import getConfig from "next/config";
import Router from "next/router";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export async function login(username: string, password: string) {
  const loginUrl = `${baseUrl}/auth/login`;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  const response = await fetch(loginUrl, requestOptions);
  const files = await response.json();
  console.log(files.access_token);
}
