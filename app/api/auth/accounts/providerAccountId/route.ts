import AccountModel from "@/database/account.model";
import dbConnect from "@/lib/dbconnection";
import handleError from "@/lib/error-handler";
import { NotFoundError } from "@/lib/http-erros";
import { NextResponse } from "next/server";

// get account by providerAccountId
//[for credentials it is email of usr
// and then oauth it is provided provider account
//-> api / accounts / email / route.ts
export async function POST(req: Request) {
  const { providerAccountId } = await req.json();

  try {
    if (!providerAccountId) throw new NotFoundError("Account");
    await dbConnect();
    const account = await AccountModel.findOne<AccountI>({
      providerAccountId,
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
