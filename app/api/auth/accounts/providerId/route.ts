import AccountModel from "@/database/account.model";
import dbConnect from "@/lib/dbconnection";
import handleError from "@/lib/error-handler";
import { NotFoundError } from "@/lib/http-erros";
import { NextResponse } from "next/server";

// get account by id -> api/accounts/[id]/route.ts
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    if (!id) throw new NotFoundError("Account");
    await dbConnect();
    const account = await AccountModel.findOne<AccountI>({
      providerAccountId: id,
    });
    if (!account) throw new NotFoundError("Account");
    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError("api", error) as ApiErroResponse;
  }
}
