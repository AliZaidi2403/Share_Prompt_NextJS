import { connectDB } from "@/utils/dbConnect";
import Prompt from "@/models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Propmt with this id does not exist ", {
        status: 404,
      });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts");
  }
};

export const PATCH = async (request, { params }) => {
  try {
    const { prompt, tag } = await request.json();
    await connectDB();
    const exisitngPrompt = await Prompt.findById(params.id);
    if (!exisitngPrompt) {
      return new Response(`Prompt with this ID does not exist`, {
        status: 404,
      });
    }
    exisitngPrompt.prompt = prompt;
    exisitngPrompt.tag = tag;
    await exisitngPrompt.save();
    return new Response(JSON.stringify(exisitngPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response("Prompt with this id does not exist", {
        status: 404,
      });
    }
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted successfully");
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
