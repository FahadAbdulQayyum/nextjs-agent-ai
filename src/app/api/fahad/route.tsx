import { NextResponse } from "next/server";

// Define a GET route handler
export async function GET(request: Request) {
  // Example data to return
  const data = {
    message: "Hello, world!",
    timestamp: new Date().toISOString(),
  };

  // Return the response with JSON data
  return NextResponse.json(data, { status: 200 });
}