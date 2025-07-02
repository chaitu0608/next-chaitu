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
      return Response.json(
        {
          success: false,
          message: "Username already exists.",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      true; // TODO:Back here
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });
      await newUser.save();
    }

    //Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
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
