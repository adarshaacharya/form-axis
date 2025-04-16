"use client";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
import { ShinyTag } from "./components/shiny-tag";

const faqs = [
  {
    question: "Why should I use Form Axis instead of Google Forms?",
    answer:
      "Because you deserve better than a spreadsheet in disguise. Form Axis lets you create forms that feel like a conversation, not a pop quiz from your least favorite teacher.",
  },
  {
    question: "Is Form Axis really AI-powered, or is it just a fancy buzzword?",
    answer:
      "It's real AI. No smoke, no mirrors, and definitely no interns pretending to be chatbots. Our forms are powered by Gemini, not by someone frantically typing answers in the background.",
  },
  {
    question: "Is Form Axis actually free?",
    answer: `Free until my server bill hits like a meteor and I’m eating Wai Wai for breakfast, lunch, and dinner. When that  invoice lands, you might see a ‘Save My Soul’ button pop up. Till then, mooch away!`,
  },
  {
    question: "Can I use Form Axis if I have zero tech skills?",
    answer:
      "If you can order pizza online, you’re overqualified for Form Axis. No coding, no tech bro nonsense, and no judgment if you still use Internet Explorer (well, maybe a little).",
  },
];

export function FAQ() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="mx-auto w-fit rounded-full border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-900/30 px-4 py-1 mb-6">
            <ShinyTag>
              <HelpCircle className="h-4 w-4" />
              <span>FAQ</span>
            </ShinyTag>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-orange-800 to-gray-900 dark:from-white dark:via-orange-300 dark:to-white pb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Everything you need to know about Form Axis&apos;s AI-native
            conversational forms. Can&apos;t find the answer you&apos;re looking
            for?&nbsp;
            <a
              href="https://adarsha.dev"
              className="text-primary/95 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reach out to me.
            </a>
          </p>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="border border-gray-200 dark:border-gray-800 rounded-lg mb-4 px-2
                    last:border
                "
              >
                <AccordionTrigger className="hover:no-underline py-4 px-2">
                  <span className="font-semibold text-left text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
