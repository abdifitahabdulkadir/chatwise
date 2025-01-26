import UserModel from "@/database/user.model";
import dbConnect from "@/lib/dbconnection";
import handleError from "@/lib/error-handler";
import { NotFoundError } from "@/lib/http-erros";
import { NextResponse } from "next/server";

// get user by id ==> /users/[id]
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<ApiResponse<UserI>> {
  const { id } = await params;

  try {
    if (!id) throw new NotFoundError("Account");
    await dbConnect();
    const user = await UserModel.findOne<UserI>({
      _id: id,
    });
    if (!user) throw new NotFoundError("User");
    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError("api", error) as ApiErroResponse;
  }
}
