import { del, put, list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  const id = searchParams.get("id");
  const form = await request.formData();
  const file = form.get("file") as File;

  if (!filename || !file || !id) {
    return new NextResponse(JSON.stringify({ error: "Неверные параметры запроса" }), {
      status: 403,
    });
  }
  try {
    const resultList = await list({ prefix: "avatars/" + id + "/" });

    if (resultList.blobs.length > 0) {
      await del(resultList.blobs.map((blob) => blob.url));
    }

    const blob = await put(`avatars/${id}/${filename}`, file, {
      access: "public",
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: "Ошибка сервера" }), {
      status: 500,
    });
  }
}
