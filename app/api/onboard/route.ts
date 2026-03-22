import { NextResponse } from "next/server"

const RESEND_API_KEY = process.env.RESEND_API_KEY || ""
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || ""
const TO_EMAIL = process.env.ADMIN_EMAIL || "gamblerspassion@gmail.com"

const PROGRAM_LABELS: Record<string, string> = {
  referral: "Referral Partner",
  "sales-agent": "Sales Agent",
  business: "Business Partnership",
  "spectrum-event": "Spectrum Event Team",
  "tmobile-d2d": "T-Mobile Fiber D2D",
  "verizon-d2d": "Verizon Fios D2D",
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      token,
      partnerType,
      legalName,
      dbaName,
      entityType,
      address,
      city,
      state,
      zipCode,
      taxId,
      signatureDataUrl,
      idDocUrl,
      badgePhotoUrl,
      isContractRead,
      isAcknowledged,
      email,
      effectiveDate: clientEffectiveDate,
      programLabel: clientProgramLabel,
      contractorName,
    } = body
    const resolvedTaxId = taxId || body.einLast4 || ""

    // Validate required onboarding fields
    if (!token || !legalName || !signatureDataUrl || !isContractRead) {
      return NextResponse.json(
        { error: "Missing required onboarding fields" },
        { status: 400 }
      )
    }

    const programLabel = clientProgramLabel || PROGRAM_LABELS[partnerType] || partnerType || "Unknown"
    const now = new Date()
    const signedDate = now.toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    })

    // 1. Submit onboarding data to Google Sheets
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: legalName,
          email: email || "",
          company: dbaName || "",
          phone: "",
          website: "",
          message: [
            `ONBOARDING COMPLETE`,
            `Program: ${programLabel}`,
            `Entity: ${entityType || "N/A"}`,
            `Address: ${[address, city, state, zipCode].filter(Boolean).join(", ")}`,
            `EIN / SSN: ${resolvedTaxId || "N/A"}`,
            `ID: ${idDocUrl ? "Uploaded" : "Skipped"}`,
            `Badge Photo: ${badgePhotoUrl ? "Uploaded" : "Skipped"}`,
            `Signed: ${signedDate}`,
            `Token: ${token}`,
          ].join(" | "),
        }),
      })
    } catch (sheetErr) {
      console.error("Google Sheet error:", sheetErr)
    }

    // 2. Send admin notification with full onboarding details
    const adminRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Stance Onboarding <onboarding@resend.dev>",
        to: [TO_EMAIL],
        subject: `Onboarding Complete — ${legalName} (${programLabel})`,
        html: `
          <div style="background:#0a0e13;padding:40px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
            <div style="max-width:600px;margin:0 auto">
              <div style="border-bottom:2px solid #22c55e;padding-bottom:20px;margin-bottom:24px">
                <h1 style="color:#fff;font-size:22px;margin:0">Onboarding Complete</h1>
                <p style="color:#22c55e;font-size:14px;margin:4px 0 0">${programLabel} — Contract Signed</p>
              </div>

              <table style="width:100%;border-collapse:collapse;background:#111827;border:1px solid #1f2937">
                <tr style="background:#1a1f2e">
                  <td style="padding:10px 16px;color:#9ca3af;font-size:14px">Legal Name</td>
                  <td style="padding:10px 16px;color:#fff;font-size:14px;font-weight:600">${legalName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;color:#9ca3af;font-size:14px">DBA / Company</td>
                  <td style="padding:10px 16px;color:#fff;font-size:14px">${dbaName || "N/A"}</td>
                </tr>
                <tr style="background:#1a1f2e">
                  <td style="padding:10px 16px;color:#9ca3af;font-size:14px">Entity Type</td>
                  <td style="padding:10px 16px;color:#fff;font-size:14px">${entityType || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;color:#9ca3af;font-size:14px">Address</td>
                  <td style="padding:10px 16px;color:#fff;font-size:14px">${[address, city, state, zipCode].filter(Boolean).join(", ") || "N/A"}</td>
                </tr>
                <tr style="background:#1a1f2e">
                  <td style="padding:10px 16px;color:#9ca3af;font-size:14px">EIN / SSN</td>
                  <td style="padding:10px 16px;color:#fff;font-size:14px">${resolvedTaxId || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;color:#9ca3af;font-size:14px">Email</td>
                  <td style="padding:10px 16px;color:#fff;font-size:14px">${email ? `<a href="mailto:${email}" style="color:#60a5fa">${email}</a>` : "N/A"}</td>
                </tr>
                <tr style="background:#1a1f2e">
                  <td style="padding:10px 16px;color:#9ca3af;font-size:14px">Program</td>
                  <td style="padding:10px 16px;color:#fff;font-size:14px">${programLabel}</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;color:#9ca3af;font-size:14px">Signed At</td>
                  <td style="padding:10px 16px;color:#fff;font-size:14px">${signedDate}</td>
                </tr>
                <tr style="background:#1a1f2e">
                  <td style="padding:10px 16px;color:#9ca3af;font-size:14px">Acknowledged</td>
                  <td style="padding:10px 16px;color:#fff;font-size:14px">${isAcknowledged ? "Yes" : "No"}</td>
                </tr>
              </table>

              ${
                idDocUrl || badgePhotoUrl
                  ? `
              <div style="margin-top:24px;background:#111827;border:1px solid #1f2937;padding:16px">
                <p style="color:#9ca3af;font-size:13px;margin:0 0 12px;font-weight:600">Uploaded Documents</p>
                ${idDocUrl ? `<p style="margin:0 0 8px"><a href="${idDocUrl}" style="color:#60a5fa;font-size:14px">View Government ID</a></p>` : ""}
                ${badgePhotoUrl ? `<p style="margin:0"><a href="${badgePhotoUrl}" style="color:#60a5fa;font-size:14px">View Badge Photo</a></p>` : ""}
              </div>`
                  : ""
              }

              <div style="margin-top:24px;padding:16px;background:#111827;border:1px solid #1f2937">
                <p style="color:#9ca3af;font-size:13px;margin:0 0 8px">Electronic Signature</p>
                <img src="${signatureDataUrl}" alt="Signature" style="max-width:300px;height:auto;background:#fff;padding:8px" />
              </div>

              <div style="margin-top:16px;padding:12px;background:#0d1117;border:1px solid #1f2937">
                <p style="color:#4b5563;font-size:12px;margin:0">Token: ${token}</p>
              </div>

              <p style="color:#4b5563;font-size:11px;margin-top:20px">Submitted via stance-marketing.com/onboarding</p>
            </div>
          </div>
        `,
      }),
    })

    if (!adminRes.ok) {
      console.error("Admin email error:", await adminRes.text())
    }

    // 3. Send confirmation to contractor
    if (email) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Stance Marketing <onboarding@resend.dev>",
            to: [email],
            subject: "Onboarding Complete — Stance Marketing",
            html: `
              <div style="background:#0a0e13;padding:40px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
                <div style="max-width:600px;margin:0 auto">
                  <div style="border-bottom:2px solid #22c55e;padding-bottom:20px;margin-bottom:24px">
                    <h1 style="color:#fff;font-size:22px;margin:0">Welcome to Stance Marketing</h1>
                    <p style="color:#22c55e;font-size:14px;margin:4px 0 0">Onboarding Complete</p>
                  </div>

                  <p style="color:#d1d5db;font-size:15px;line-height:1.6;margin:0 0 16px">
                    Hi ${legalName.split(" ")[0]},
                  </p>
                  <p style="color:#d1d5db;font-size:15px;line-height:1.6;margin:0 0 16px">
                    Your Independent Contractor Agreement has been received and your onboarding is now complete. Here is a summary of what was submitted:
                  </p>

                  <table style="width:100%;border-collapse:collapse;background:#111827;border:1px solid #1f2937;margin-bottom:24px">
                    <tr style="background:#1a1f2e">
                      <td style="padding:10px 16px;color:#9ca3af;font-size:14px">Program</td>
                      <td style="padding:10px 16px;color:#fff;font-size:14px">${programLabel}</td>
                    </tr>
                    <tr>
                      <td style="padding:10px 16px;color:#9ca3af;font-size:14px">Contract Signed</td>
                      <td style="padding:10px 16px;color:#22c55e;font-size:14px">${signedDate}</td>
                    </tr>
                    <tr style="background:#1a1f2e">
                      <td style="padding:10px 16px;color:#9ca3af;font-size:14px">Documents</td>
                      <td style="padding:10px 16px;color:#fff;font-size:14px">${[idDocUrl ? "ID Uploaded" : null, badgePhotoUrl ? "Badge Photo Uploaded" : null].filter(Boolean).join(", ") || "None"}</td>
                    </tr>
                  </table>

                  <div style="padding:16px;background:#111827;border:1px solid #1f2937;border-left:3px solid #22c55e">
                    <p style="color:#d1d5db;font-size:14px;margin:0 0 8px;font-weight:600">What happens next?</p>
                    <p style="color:#9ca3af;font-size:14px;line-height:1.6;margin:0">
                      Our team will review your documents and finalize your account setup. You will receive your login credentials and training materials within 1-2 business days.
                    </p>
                  </div>

                  <div style="margin-top:24px;padding:16px;background:#111827;border:1px solid #1f2937;border-left:3px solid #ef4444">
                    <p style="color:#9ca3af;font-size:13px;margin:0">
                      Questions? Contact us at <a href="mailto:partnerships@stancellc.com" style="color:#60a5fa">partnerships@stancellc.com</a>
                    </p>
                  </div>

                  <p style="color:#4b5563;font-size:11px;margin-top:20px">Stance Marketing LLC</p>
                </div>
              </div>
            `,
          }),
        })
      } catch {
        // Non-fatal
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Onboarding API error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
