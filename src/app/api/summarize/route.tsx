import { NextResponse } from "next/server";
import OpenAI from "openai";
// import pdfParse from "pdf-parse"; // Comment out for now

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    console.log("1. API hit");
    console.log("2. Parsing formData...");
    const formData = await request.formData();
    console.log("3. FormData parsed:", Object.fromEntries(formData));
    const file = formData.get("file") as File;
    console.log("4. File retrieved:", file ? file.name : "No file");

    if (!file) {
      console.log("5. No file detected, returning error");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("6. Converting file to arrayBuffer...");
    const arrayBuffer = await file.arrayBuffer();
    console.log("7. ArrayBuffer created, length:", arrayBuffer.byteLength);
    const buffer = Buffer.from(arrayBuffer);
    console.log("8. Buffer created, length:", buffer.length);

    let text = "";
    if (file.type === "application/pdf") {
      console.log("9. File is PDF, using placeholder text");
      // const pdfData = await pdfParse(buffer); // Comment out
      text = "Placeholder PDF text"; // Temporary workaround
      console.log("10. PDF text set:", text);
    } else if (file.type === "text/plain") {
      console.log("11. File is TXT, decoding...");
      text = new TextDecoder().decode(buffer);
      console.log("12. TXT text decoded:", text);
    } else {
      console.log("13. Unsupported file type:", file.type);
      return NextResponse.json(
        { error: "Unsupported file type. Use PDF or TXT." },
        { status: 400 }
      );
    }

    console.log("14. Extracted text:", text);

    console.log("15. Calling OpenAI API...");
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Summarize the following text concisely." },
        { role: "user", content: text },
      ],
      max_tokens: 150,
    });
    console.log("16. OpenAI response received:", completion.choices[0].message.content);

    const summary = completion.choices[0].message.content;
    // const summary = "Brilliant, Right? I'm here without any token used..."; // for testing purpose
    console.log("17. Summary prepared:", summary);

    console.log("18. Returning response...");
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("19. Error caught:", error);
    return NextResponse.json(
      { error: `Failed to process file or summarize due to ${error}` },
      { status: 500 }
    );
  }
}




















// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// // import pdfParse from "pdf-parse"; // Comment out for now

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request: Request) {
//   try {
//     console.log("API hit");
//     const formData = await request.formData();
//     const file = formData.get("file") as File;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     let text = "";
//     if (file.type === "application/pdf") {
//       // const pdfData = await pdfParse(buffer); // Comment out
//       text = "Placeholder PDF text"; // Temporary workaround
//     } else if (file.type === "text/plain") {
//       text = new TextDecoder().decode(buffer);
//     } else {
//       return NextResponse.json(
//         { error: "Unsupported file type. Use PDF or TXT." },
//         { status: 400 }
//       );
//     }

//     console.log("Extracted text:", text);

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "Summarize the following text concisely." },
//         { role: "user", content: text },
//       ],
//       max_tokens: 150,
//     });

//     const summary = completion.choices[0].message.content;
//     return NextResponse.json({ summary });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { error: "Failed to process file or summarize" },
//       { status: 500 }
//     );
//   }
// }