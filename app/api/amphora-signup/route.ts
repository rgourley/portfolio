import { NextResponse } from "next/server";

type Segment = {
  id: string;
  name: string;
};

type SegmentList = {
  data: Segment[];
};

type SignupPayload = {
  email?: string;
};

const amphoraSegmentName = "Amphora Launch Updates";

async function getAmphoraSegmentId(apiKey: string): Promise<string | null> {
  const headers = { Authorization: `Bearer ${apiKey}` };
  const segmentsResponse = await fetch("https://api.resend.com/segments", { headers });
  if (!segmentsResponse.ok) return null;

  const segments = (await segmentsResponse.json()) as SegmentList;
  const existingSegment = segments.data.find(
    (segment) => segment.name.toLowerCase() === amphoraSegmentName.toLowerCase()
  );
  if (existingSegment) return existingSegment.id;

  const createResponse = await fetch("https://api.resend.com/segments", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ name: amphoraSegmentName }),
  });

  if (createResponse.ok) {
    const createdSegment = (await createResponse.json()) as Segment;
    return createdSegment.id;
  }

  const retryResponse = await fetch("https://api.resend.com/segments", { headers });
  if (!retryResponse.ok) return null;

  const retrySegments = (await retryResponse.json()) as SegmentList;
  return retrySegments.data.find(
    (segment) => segment.name.toLowerCase() === amphoraSegmentName.toLowerCase()
  )?.id ?? null;
}

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The Amphora mailing list is not configured." },
      { status: 503 }
    );
  }

  let body: SignupPayload;
  try {
    body = (await request.json()) as SignupPayload;
  } catch {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const segmentId = await getAmphoraSegmentId(apiKey);
    if (!segmentId) {
      return NextResponse.json(
        { error: "Could not prepare the Amphora mailing list." },
        { status: 502 }
      );
    }

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
        { method: "POST", headers: { Authorization: `Bearer ${apiKey}` } }
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
