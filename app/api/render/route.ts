import { NextRequest, NextResponse } from "next/server";
import ejs from "ejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { template, data } = body;

    // Validate inputs
    if (typeof template !== "string") {
      return NextResponse.json(
        { error: "Template must be a string" },
        { status: 400 }
      );
    }

    if (typeof data !== "string") {
      return NextResponse.json(
        { error: "Data must be a string" },
        { status: 400 }
      );
    }

    // Parse JSON data
    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch (parseError) {
      return NextResponse.json(
        {
          error: "Invalid JSON data",
          details:
            parseError instanceof Error ? parseError.message : "Unknown error",
        },
        { status: 400 }
      );
    }

    // Render EJS template
    try {
      const rendered = ejs.render(template, parsedData, {
        async: false,
        compileDebug: true,
        _with: true,
      });

      return NextResponse.json({ rendered });
    } catch (renderError) {
      // Extract useful error information
      let errorMessage = "Failed to render template";
      let errorDetails = "";

      if (renderError instanceof Error) {
        errorMessage = renderError.message;

        // Try to extract line number information
        const lineMatch = errorMessage.match(/line (\d+)/i);
        if (lineMatch) {
          errorDetails = `Error on line ${lineMatch[1]}`;
        }
      }

      return NextResponse.json(
        {
          error: errorMessage,
          details: errorDetails,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        details:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
