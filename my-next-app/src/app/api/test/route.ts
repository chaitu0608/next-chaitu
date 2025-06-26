import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function GET() {
  await dbConnect();

  const users = await UserModel.find();

  return NextResponse.json({ users });
}
