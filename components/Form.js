import Link from "next/link";

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-center flex-col">
        <h1 className="head_text text-center ">
            <span className="lightblue_gradient">Start Here and {type} Your Group</span>
        </h1>
        <p className="desc text-start max-w-md">
            Lets identify your Group by giving it a special name
        </p>

        <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        >
            <label>
                <span className="font-satoshi font-light text-base text-gray-800">
                    Your Group Name
                </span>

                  <input
                    value={post.name}
                    onChange={(e) => setPost({ ...post, name: e.target.value })}
                    placeholder="Group Name"
                    required
                    className="form_input"
                  />
            </label>

            <div className="flex-end mx-3 mb-5 gap-4">
                <Link href="/" className="text-gray-500 text-sm">
                    Cancel
                </Link>

                <button 
                type="submit"
                disabled={submitting}
                className="px-5 py-1.5 text-sm bg-blue-400 rounded-full text-white"
                >
                  {submitting ? `${type}...` : type}
                </button>
            </div>

        </form>

    </section>
  )
}

export default Form