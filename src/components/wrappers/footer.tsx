import { SiGithub } from "@icons-pack/react-simple-icons";

export function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-black py-8 text-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Form Axis. All rights reserved. •
            Built by{" "}
            <a
              href="https://adarsha.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:underline font-medium"
            >
              Adarsha Acharya
            </a>
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-0">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Inquiries & Sponsor:
              </span>
              <a
                href="mailto:hi@adarsha.dev"
                className="text-sm hover:underline"
                title="Contact for inquiries or sponsorship"
              >
                <span className="underline px-1.5 py-0.5 rounded-md text-orange-600">
                  hi@adarsha.dev
                </span>
              </a>
            </div>
            <a
              href="https://github.com/adarshaacharya/form-axis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-500 text-sm underline hover:text-gray-300 dark:hover:text-gray-300 transition-colors"
            >
              <SiGithub className="h-5 w-5 inline-block mr-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
