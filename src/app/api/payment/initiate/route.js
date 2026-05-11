import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, amount, purpose } = body;

    // Validate required fields
    if (!name || !email || !phone || !amount || !purpose) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const key  = process.env.EASEBUZZ_KEY;
    const salt = process.env.EASEBUZZ_SALT;

    if (!key || !salt) {
      return NextResponse.json({ message: 'Payment gateway not configured' }, { status: 500 });
    }

    // Generate unique transaction ID
    const txnid = 'MIU' + Date.now() + Math.random().toString(36).substring(2, 7).toUpperCase();

    // Format amount to 2 decimal places — must be identical in hash and payload
    const formattedAmount = parseFloat(amount).toFixed(2);
    const productinfo    = purpose.trim();
    const firstname      = name.trim();
    const emailTrimmed   = email.trim();

    // Build hash exactly: key|txnid|amount|productinfo|firstname|email|||||||||||salt
    const hashString = `${key}|${txnid}|${formattedAmount}|${productinfo}|${firstname}|${emailTrimmed}|||||||||||${salt}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://miu.edu.in';

    // Split payment — full amount goes to Edtech Innovate Pvt. Ltd
    const splitPayments = JSON.stringify({
      'Edtech Innovate Pvt. Ltd': parseFloat(formattedAmount),
    });

    const payload = {
      key,
      txnid,
      amount: formattedAmount,
      productinfo,
      firstname,
      email: emailTrimmed,
      phone: phone.trim(),
      surl: `${baseUrl}/payonline/success`,
      furl: `${baseUrl}/payonline/failed`,
      hash,
      udf1: '', udf2: '', udf3: '', udf4: '', udf5: '',
      split_payments: splitPayments,
    };

    return NextResponse.json({ success: true, payload });
  } catch (error) {
    console.error('Payment initiate error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
