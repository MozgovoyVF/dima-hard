import { put, PutBlobResult } from "@vercel/blob";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";

export async function POST(request: Request): Promise<NextResponse> {
  const header = request.headers;
  const authHeader = header.get("authorization") || "";
  const authToken = authHeader.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null;

  if (!authToken) {
    return NextResponse.json({ error: "jwt must be provided" }, { status: 401 });
  }

  const decodedToken = jwt.decode(authToken) as UserIDJwtPayload | null;

  if (!decodedToken || !decodedToken.id) {
    return NextResponse.json({ error: "Invalid JWT token" }, { status: 401 });
  }

  const id = decodedToken.id;

  let form: FormData;
  try {
    form = await request.formData();
  } catch (error) {
    console.error("Ошибка при разборе FormData:", error);
    return NextResponse.json({ error: "Неверные параметры запроса" }, { status: 400 });
  }

  const files = form.getAll("files");

  if (!files || files.length === 0) {
    return NextResponse.json({ error: "Неверные параметры запроса" }, { status: 400 });
  }

  // Проверка, что все элементы являются файлами
  const validFiles: File[] = [];
  for (const file of files) {
    if (file instanceof File) {
      validFiles.push(file);
    } else {
      return NextResponse.json({ error: "Некорректный файл" }, { status: 400 });
    }
  }

  try {
    const blobs: PutBlobResult[] = [];
    for (const file of validFiles) {
      const blob = await put(`galery/${id}/${file.name}`, file, {
        access: "public",
      });
      blobs.push(blob);
    }

    return NextResponse.json(blobs, { status: 200 });
  } catch (error) {
    console.error("Ошибка при загрузке файлов:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
