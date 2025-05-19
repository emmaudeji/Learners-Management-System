import { fetchCollectionData, updateDocument } from "@/lib/appwrite";
import { FetchPayload } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // ✅ Parse and validate body
    const body = (await req.json()) as FetchPayload;
    const { collectionId, param, fields,  } = body;

    if (!collectionId ) {
      return NextResponse.json(
        { error: "Missing required fields: collectionId and documentId" },
        { status: 400 }
      );
    }

    // ✅ Call your Appwrite function
    const {  error, data } = await fetchCollectionData(collectionId, param, fields);

    if ( error) {
      return NextResponse.json(
        { error: error ?? "Failed to fetch documents." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });

  } catch (error) {
    console.error(`UNHANDLED FETCH ERROR: `, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
