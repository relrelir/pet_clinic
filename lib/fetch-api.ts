export default async function fetchApi<Result = any>(
  path: string,
  init?: RequestInit
): Promise<Result> {
  try {
    let url = `${process.env.API_URL}${path}`;
    console.log(`fetchApi.url: ${url}`);
    let res: Response = await fetch(url, init);
    let data: Result = await res.json();
    return data;
  } catch (e) {
    console.log("fetchApi.error", e);
    return null;
  }
}
