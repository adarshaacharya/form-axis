"use client";

import { motion } from "motion/react";
import { MessageSquare, Sparkles, Link } from "lucide-react";
import { ChatAnimation } from "./chat-animation";

const features = [
  {
    title: "Conversational Interface",
    description:
      "Transform rigid form-filling into natural conversations that feel like texting a friendly AI assistant.",
    icon: <MessageSquare className="h-5 w-5 text-primary" />,
  },
  {
    title: "One-Prompt Form Creation",
    description:
      "Describe your needs once, and watch as our AI generates perfectly tailored questions in seconds.",
    icon: <Sparkles className="h-5 w-5 text-primary" />,
  },
  {
    title: "Frictionless Sharing",
    description:
      "Share one simple link and collect responses with 78% higher completion rates than traditional forms.",
    icon: <Link className="h-5 w-5 text-primary" />,
  },
];

export function Features() {
  return (
    <section className="py-24 overflow-hidden bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Section header - Updated to left alignment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="md:max-w-xl mb-16"
        >
          <span className="inline-flex items-center rounded-full bg-primary/10 dark:bg-orange-600/20 px-3 py-1 text-sm font-medium text-primary dark:text-orange-500 mb-2">
            Human-Centered Design
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-primary to-gray-900 dark:from-white dark:via-orange-300 dark:to-white mb-4">
            Forms That Feel Like Conversations
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Remove the friction of traditional forms with AI-powered
            conversational interfaces that boost response rates by 80% and
            deliver deeper insights.
          </p>
        </motion.div>

        {/* Features and visualization in two columns */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Feature cards with light/dark mode support */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/30 rounded-xl p-6 hover:border-primary/50 dark:hover:border-orange-500/50 transition-all duration-300 group shadow-sm"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.2 },
                }}
              >
                <div className="flex gap-4 items-start">
                  <div className="mt-0.5 p-2.5 rounded-full bg-primary/10 dark:bg-orange-600/20 text-primary dark:text-orange-500 group-hover:bg-primary/15 dark:group-hover:bg-orange-600/30 group-hover:scale-110 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-orange-500 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Animated chat SVG with light/dark mode support */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="relative"
          >
            <ChatAnimation />

            {/* Enhanced decorative elements with orange glows */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-500/10 dark:bg-orange-500/10 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
