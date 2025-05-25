import { addDocument, deleteDocument } from "@/lib/appwrite";
import { DeletePayload } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    // ✅ Parse and validate body
    const body = (await req.json()) as DeletePayload;
    const { collectionId, documentId } = body;

    if (!collectionId || !documentId) {
      console.log("DELETE ERROR: Missing required fields: collectionId and documentId")
      return NextResponse.json(
        { error: "Missing required fields: collectionId and documentId" },
        { status: 400 }
      );
    }

    // ✅ Call your Appwrite function
    const { success, error } = await deleteDocument(collectionId, documentId);
    console.log({success})

    if (!success ) {
      return NextResponse.json(
        { error: error||"Failed to delete document." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success }, { status: 200 });

  } catch (error) {
    console.error(`UNHANDLED DELETE ERROR: `, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
