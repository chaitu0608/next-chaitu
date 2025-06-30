import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { stat } from "fs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();
    const existingUserVerfifedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerfifedByUsername) {
      return NextResponse.json(
        {
          success: false,
          message: "Username already exists.",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json({
      success: false,
      message: "Failed to register user. Please try again later.",
    });
    {
      status: 500;
    }
  }
}
