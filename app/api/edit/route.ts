import { updateDocument } from "@/lib/appwrite";
import { EditPayload } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    // ✅ Parse and validate body
    const body = (await req.json()) as EditPayload;
    const { collectionId, formData, fields, documentId } = body;

    if (!collectionId || !formData  || !documentId) {
      return NextResponse.json(
        { error: "Missing required fields: collectionId and documentId" },
        { status: 400 }
      );
    }

    // ✅ Call your Appwrite function
    const { success, error, data } = await updateDocument(collectionId, documentId, formData, fields);

    if (!success || error) {
      return NextResponse.json(
        { error: error ?? "Failed to update document." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });

  } catch (error) {
    console.error(`UNHANDLED UPDATE ERROR: `, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
