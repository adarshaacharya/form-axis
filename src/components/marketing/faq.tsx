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
      "Form Pilot creates AI-native conversational forms that don't make you feel like you're filling out a tax return from 1995. It's like the difference between texting your friend and filling out a government customs declaration form. Our chat interface means no more staring at checkboxes wondering if you're legally obligated to check 'Other' when none of the options apply!",
  },
  {
    question: "Is Form Pilot completely free to use?",
    answer:
      "Yes, it's free! Well... unless my server bills and LLM costs skyrocket so high that I have to start selling my furniture. If you suddenly find me coding from a cardboard box with 'Will Program For Food' sign, then we might need to add a small fee. But for now, enjoy the free ride while my bank account still exists! 🚀",
  },
  {
    question: "How do I create a conversational form?",
    answer:
      "Just type out what you want to ask like you're texting a slightly dim but eager-to-please friend. Form Pilot does the rest, transforming your casual questions into a conversation that flows naturally. No need for a PhD in UX design or spending hours aligning dropdown menus that nobody will read anyway!",
  },
  {
    question: "Can I edit my form after creating it?",
    answer:
      "Absolutely! Unlike that regrettable tattoo you got in college, our forms can be edited anytime. Change questions, switch answer types, or completely redesign your form whenever inspiration (or panic) strikes. We won't judge your 3 AM edits when you realize you forgot to ask the most important question.",
  },
  {
    question: "What happens if my form gets too many responses?",
    answer:
      "First, congratulations on your popularity! Second, nothing bad happens - we don't have usage caps that suddenly lock you out when you go viral. Though if you get so many responses that you crash our servers, I might show up at your door asking for a job. Your form clearly has better marketing than our entire platform!",
  },
  {
    question: "Do I need technical knowledge to use Form Pilot?",
    answer:
      "If you can order pizza online, you're overqualified for using Form Pilot. No coding, no HTML, no CSS, no understanding of what those acronyms even mean. The most technical thing you'll do is click 'Create Form' and then try to convince yourself you're a tech genius afterward. We won't tell anyone how easy it actually was.",
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
