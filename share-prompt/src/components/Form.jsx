import Link from "next/link";

function Form({ type, post, setPost, submitting, handleSubmit }) {
  return (
    <section className="w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post </span>
      </h1>
      <p className="desc text-left max-w-md">
        Share amazing prompts with the world and let your imagination run wild!!
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label className="flex flex-col gap-4">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            You AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value });
            }}
            placeholder="Write Your Prompts here..."
            className="font_textarea"
            required
          />
        </label>
        <label className="flex flex-col gap-4">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag <span>(#product,#webDevelopment,#idea)</span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
            placeholder="#tag"
            className="form_input"
            required
          />
        </label>
        <div className="flex-end  mx-5 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 bg-primary-orange text-sm rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
