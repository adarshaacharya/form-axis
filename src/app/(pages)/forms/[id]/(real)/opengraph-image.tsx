import { ImageResponse } from "next/og";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
export const runtime = "edge";

export const alt = "Form Axis - AI-Native Conversational Form Builder";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function TripleDots() {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        marginBottom: "100px",
      }}
    >
      <div
        style={{
          width: "12px",
          height: "12px",
          background: "#fdba74",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          width: "12px",
          height: "12px",
          background: "#ff9366",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          width: "12px",
          height: "12px",
          background: "#f54a00",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

export default async function Image({ params }: { params: { id: string } }) {
  const formId = params.id as Id<"forms">;

  // can't use REGULAR 😭 cuz limit is 1MB for serverless function in hobby project
  // Vercel sponsor me  😭😭😭😭
  //   const interRegular = await fetch(
  //     new URL(
  //       "../../../../../public/_static/fonts/Inter-Regular.ttf",
  //       import.meta.url
  //     )
  //   ).then((res) => res.arrayBuffer());

  const interBold = await fetch(
    new URL(
      "../../../../../../public/_static/fonts/Inter-Bold.ttf",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  try {
    const form = await fetchQuery(api.forms.getPublicForm, { formId });

    if (!form) {
      return new ImageResponse(
        (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              background: "radial-gradient(circle, #e0e7ff 0%, #f3f4f6 100%)",
              padding: "60px",
              fontFamily: "Inter",
              position: "relative",
              border: "16px solid #f54a00",
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: "bold",
                color: "#1f2937",
                textAlign: "center",
                marginBottom: 120,
                maxWidth: "85%",
                textShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
              }}
            >
              📝 Form Not Found
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                textAlign: "center",
                fontSize: 22,
                color: "#6b7280",
                paddingLeft: 60,
                paddingRight: 60,
              }}
            >
              Powered by{" "}
              <span style={{ fontWeight: "bold", marginLeft: "6px" }}>
                Form Axis
              </span>
            </div>
          </div>
        ),
        {
          ...size,
          fonts: [
            {
              name: "Inter",
              data: interBold,
              style: "normal",
              weight: 400,
            },
            {
              name: "Inter",
              data: interBold,
              style: "normal",
              weight: 700,
            },
          ],
        }
      );
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle, #e0e7ff 0%, #f3f4f6 100%)",
            fontFamily: "Inter",
            padding: "60px",
            position: "relative",
            border: "16px solid #f54a00",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "#1f2937",
              textAlign: "center",
              maxWidth: "85%",
              marginBottom: 60,
              textShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
              lineHeight: 1.25,
            }}
          >
            {form.title}
          </div>

          <TripleDots />

          <div
            style={{
              position: "absolute",
              bottom: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              textAlign: "center",
              fontSize: 22,
              color: "#6b7280",
              paddingLeft: 60,
              paddingRight: 60,
            }}
          >
            Powered by{" "}
            <span style={{ fontWeight: "bold", marginLeft: "6px" }}>
              Form Axis
            </span>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: "Inter",
            data: interBold,
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: interBold,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle, #e0e7ff 0%, #f3f4f6 100%)",
            padding: "60px",
            fontFamily: "Inter",
            position: "relative",
            border: "16px solid #f54a00",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "#1f2937",
              textAlign: "center",
              marginBottom: 40,
              maxWidth: "85%",
              textShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            Form Axis
          </div>

          <div
            style={{
              fontSize: 32,
              color: "#4b5563",
              textAlign: "center",
              maxWidth: "75%",
              marginBottom: 60,
              fontWeight: 400,
            }}
          >
            AI-Native Conversational Form Builder
          </div>

          <TripleDots />
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: "Inter",
            data: interBold,
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: interBold,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  }
}
