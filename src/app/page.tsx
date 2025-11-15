export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <img src="/favicon.ico" alt="Campus Link" className="hover:scale-160 hover:rotate-360 duration-400" />
      <h1 className="text-5xl font-extrabold mb-4 mt-2">Campus Link</h1>
      <p className="text-lg text-gray-400 max-w-xl">
        Migrating from <span className="font-semibold text-black">React.js </span>
        to <span className="font-semibold text-black">Next.js</span>.  </p>
      <p>

        You can still visit the old version here {" "}
        <a
          href="https://cl-campus-link.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          Campus Link (React)
        </a>
      </p>
    </main>
  );
}
