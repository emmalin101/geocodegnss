import { mkdir, appendFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9 ()-]{7,22}$/;

type InquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  country?: string;
  product?: string;
  message?: string;
  website?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function sendInquiryEmail(payload: {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  product: string;
  message: string;
  createdAt: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRY_TO_EMAIL || "info@toknavgnss.com";
  const fromEmail = process.env.INQUIRY_FROM_EMAIL || "TOKNAV Website <onboarding@resend.dev>";

  if (!apiKey) return;

  const html = `
    <h2>New TOKNAV Website Inquiry</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Phone:</strong> ${payload.phone}</p>
    <p><strong>Company:</strong> ${payload.company || "-"}</p>
    <p><strong>Country / Region:</strong> ${payload.country || "-"}</p>
    <p><strong>Product Requirement:</strong> ${payload.product || "-"}</p>
    <p><strong>Message:</strong></p>
    <p>${payload.message || "-"}</p>
    <p><strong>Submitted At:</strong> ${payload.createdAt}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.email,
      subject: `New TOKNAV Inquiry from ${payload.name}`,
      html
    })
  });

  if (!response.ok) {
    throw new Error("Email delivery failed.");
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryPayload;

    if (clean(body.website)) {
      return NextResponse.json({ ok: true, message: "Inquiry received." });
    }

    const payload = {
      name: clean(body.name),
      email: clean(body.email),
      phone: clean(body.phone),
      company: clean(body.company),
      country: clean(body.country),
      product: clean(body.product),
      message: clean(body.message),
      createdAt: new Date().toISOString()
    };

    const errors: Record<string, string> = {};
    if (!payload.name) errors.name = "Name is required.";
    if (!payload.email) errors.email = "Email is required.";
    if (payload.email && !emailPattern.test(payload.email)) errors.email = "Invalid email format.";
    if (!payload.phone) errors.phone = "Phone is required.";
    if (payload.phone && !phonePattern.test(payload.phone)) errors.phone = "Invalid phone format.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, message: "Please complete the required fields.", errors },
        { status: 400 }
      );
    }

    const dataDir = join(process.cwd(), "data");
    await mkdir(dataDir, { recursive: true });
    await appendFile(join(dataDir, "inquiries.jsonl"), `${JSON.stringify(payload)}\n`, "utf8");

    // Optional email integration:
    // Add RESEND_API_KEY, INQUIRY_TO_EMAIL and INQUIRY_FROM_EMAIL in production.
    // Without RESEND_API_KEY, the inquiry is still stored in data/inquiries.jsonl.
    await sendInquiryEmail(payload);

    return NextResponse.json({ ok: true, message: "Inquiry submitted successfully." });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Submission failed. Please email info@toknavgnss.com directly." },
      { status: 500 }
    );
  }
}
