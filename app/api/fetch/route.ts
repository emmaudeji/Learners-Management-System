import { fetchCollectionData } from "@/lib/appwrite";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const collectionId = searchParams.get("collectionId");
    const fieldsRaw = searchParams.get("fields") || "";
    const fields = fieldsRaw.split(",").filter(Boolean); // string[] of fields

    const param: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith("param.")) {
        const actualKey = key.replace("param.", "");
        param[actualKey] = value;
      }
    }

    if (!collectionId) {
      return NextResponse.json(
        { error: "Missing required fields: collectionId" },
        { status: 400 }
      );
    }

    const { data, error } = await fetchCollectionData(collectionId, param, fields);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
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
