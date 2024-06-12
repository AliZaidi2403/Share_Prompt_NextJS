import { connectDB } from "@/utils/dbConnect";
import Prompt from "@/models/prompt";
export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    const result = await newPrompt.save();
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new Prompt", { status: 500 });
  }
};
