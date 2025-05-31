// app/api/cloudinary/delete/route.ts
import cloudinary from "@/utils/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { publicId } = await req.json();

  if (!publicId) return NextResponse.json({ error: "Missing publicId" }, { status: 400 });

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto",
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete asset" }, { status: 500 });
  }
}
