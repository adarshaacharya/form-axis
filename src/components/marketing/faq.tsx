"use client";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

const faqs = [
  {
    question: "What makes Form Pilot different from traditional forms?",
    answer:
      "Form Pilot creates AI-native conversational forms instead of traditional form elements. Users answer questions through a natural chat interface, eliminating the constraints of dropdowns, checkboxes, and text fields.",
  },
  {
    question: "How do I create a conversational form?",
    answer:
      "Simply write down a series of prompts or questions. Form Pilot handles the rest, creating a conversational flow that guides users through answering your questions naturally without any complex form design.",
  },
  {
    question: "Can I edit my form after creating it?",
    answer:
      "Yes! Before publishing, you can edit the questions and customize the expected answer types. Once you're satisfied with your form, you can publish it and share the link with your audience.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Pill badge */}
          <div className="mx-auto w-fit rounded-full border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-900/30 px-4 py-1 mb-6">
            <div className="flex items-center gap-2 text-sm font-medium text-orange-900 dark:text-orange-200">
              <HelpCircle className="h-4 w-4" />
              <span>FAQ</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-orange-800 to-gray-900 dark:from-white dark:via-orange-300 dark:to-white pb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Everything you need to know about Form Pilot's AI-native
            conversational forms. Can&apos;t find the answer you&apos;re looking
            for? Reach out to our team.
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
                  <span className="font-medium text-left text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
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
