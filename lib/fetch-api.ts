export default async function fetchApi<Result = any>(
  path: string,
  init?: RequestInit
): Promise<Result> {
  try {
    let res: Response = await fetch(`${process.env.API_URL}${path}`, init);
    let data: Result = await res.json();
    return data;
  } catch (e) {
    console.log("fetchApi.error", e);
    return null;
  }
}
