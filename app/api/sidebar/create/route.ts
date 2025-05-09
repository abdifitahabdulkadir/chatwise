import handleError from "@/lib/error-handler";
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

// store the title
export async function POST(req: NextRequest) {
  try {
    const { id, title, userId }: ChatTitleI = await req.json();

    const existed = await prisma.titles.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (!existed) {
      await prisma.titles.create({
        data: {
          id: id!,
          userId: userId,
          title: title,
        },
      });
    }
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return handleError("api", error) as ApiErroResponse;
  }
}
