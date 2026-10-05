import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_AMPHORA_SEGMENT_ID;

  if (!apiKey || !segmentId) {
    return NextResponse.json(
      { error: "The Amphora mailing list is not configured." },
      { status: 503 }
    );
  }

  let body: { email?: string };
  try {
    body = (await request.json()) as { email?: string };
  } catch {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
        segments: [{ id: segmentId }],
      }),
    });

    if (resendResponse.status === 409) {
      const segmentResponse = await fetch(
        `https://api.resend.com/contacts/${encodeURIComponent(email)}/segments/${encodeURIComponent(segmentId)}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}` },
        }
      );

      if (segmentResponse.ok) {
        return NextResponse.json({ success: true }, { status: 201 });
      }
    } else if (resendResponse.ok) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    console.error("Resend rejected the Amphora signup", { status: resendResponse.status });
    return NextResponse.json({ error: "Could not save your email." }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "Could not reach the mailing list." }, { status: 502 });
  }
}
