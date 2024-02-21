import base from "./routes";

type UploadImageResponse =
  | { success: true; data: { path: string; url: string; size: number } }
  | { success: false; message?: string };

export default async function uploadImage(
  file: globalThis.File
): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(base + "/api/projects/upload-image", {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    body: formData,
  });
  return response.json();
}
