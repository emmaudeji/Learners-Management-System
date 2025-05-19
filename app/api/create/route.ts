import { addDocument } from "@/lib/appwrite";
import { CreatePayload } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // ✅ Parse and validate body
    const body = (await req.json()) as CreatePayload;
    const { collectionId, formData, fields } = body;
console.log('CREATE',{ collectionId, formData, fields })
    if (!collectionId || !formData) {
      return NextResponse.json(
        { error: "Missing required fields: collectionId and formData" },
        { status: 400 }
      );
    }

    // ✅ Call your Appwrite function
    const { success, error, data } = await addDocument(collectionId, formData, fields);
    console.log('CREATE', { success, error, data })
    if (!success || error) {
      return NextResponse.json(
        { error: error ?? "Failed to add document." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });

  } catch (error) {
    console.error(`UNHANDLED INSERT ERROR: `, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
