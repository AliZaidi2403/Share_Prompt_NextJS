import Feed from "@/components/Feed";
export default function Home() {
  return (
    <div className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover And Share
        <br />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-sourse AI prompting tool for modern world to
        discover,create and share creative prompts
      </p>
      <Feed />
    </div>
  );
}
