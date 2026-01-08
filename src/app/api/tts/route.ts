import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";

const client = new textToSpeech.TextToSpeechClient();

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const request = {
      input: { text },
      voice: {
        languageCode: "kn-IN",
        name: "kn-IN-Wavenet-A", // Best Kannada voice
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: 1.0,
        pitch: 0,
      },
    };

    const [response] = await client.synthesizeSpeech(request);

    return new NextResponse(response.audioContent as Buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("TTS error:", error);
    return NextResponse.json(
      { error: "Kannada TTS failed" },
      { status: 500 }
    );
  }
}
