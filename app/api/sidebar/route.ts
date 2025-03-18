import handleError from "@/lib/error-handler";
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userId = await req.json();
    const titles = await prisma.titles.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: JSON.parse(JSON.stringify(titles)),
    });
  } catch (error) {
    return handleError("api", error) as ApiErroResponse;
  }
}
