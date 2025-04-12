export function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-black py-4 text-center">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Form Pilot. All rights reserved.
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        Made with ❤️ by{" "}
        <a
          href="https://adarsha.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Adarsha Acharya
        </a>{" "}
      </p>
    </footer>
  );
}
