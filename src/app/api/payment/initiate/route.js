import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, amount, purpose } = body;

    if (!name || !email || !phone || !amount || !purpose) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const key = process.env.EASEBUZZ_KEY;
    const salt = process.env.EASEBUZZ_SALT;

    if (!key || !salt) {
      return NextResponse.json(
        { message: "Payment gateway not configured" },
        { status: 500 },
      );
    }

    const txnid =
      "MIU" +
      Date.now() +
      Math.random().toString(36).substring(2, 7).toUpperCase();
    const formattedAmount = parseFloat(amount).toFixed(1);
    const productinfo = purpose.trim();
    const firstname = name.trim();
    const emailTrimmed = email.trim();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://miu.edu.in";

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("phone", phone);
    formdata.append("amount", amount);
    formdata.append("purpose", purpose);
    formdata.append("successurl", `${baseUrl}/payonline/success`);
    formdata.append("failedurl", `${baseUrl}/payonline/failed`);
    formdata.append("transaction_id", txnid);
    const response = await fetch(
      "https://vocational.miu.edu.in/ams/app/easebuzz/website-pay",
      {
        method: "POST",
        body: formdata,
      },
    );

    const result = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Payment initiation failed",
        },
        { status: response.status }
      );
    }
    
    return NextResponse.json({
      success: true,
      redirectUrl: `https://pay.easebuzz.in/pay/${result.data}`,
      data: result,
    });
  } catch (error) {
    console.error("Payment initiate error:", error);
    const isTimeout =
      error?.cause?.code === "ETIMEDOUT" || error?.name === "TimeoutError";
    return NextResponse.json(
      {
        message: isTimeout
          ? "Payment gateway unreachable. Please try again or contact support."
          : "Server error",
        success: false,
      },
      { status: 500 },
    );
  }
}
