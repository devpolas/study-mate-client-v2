// FAQSection.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I find study partners?",
    answer:
      "Simply create a profile, select your subjects and preferences, and the platform will suggest compatible peers near you or online.",
  },
  {
    question: "Can I organize offline study sessions?",
    answer:
      "Yes! StudyMate allows you to connect with nearby students and schedule offline meetups safely.",
  },
  {
    question: "Is StudyMate free to use?",
    answer:
      "Absolutely. You can access the core features for free and upgrade for premium features if needed.",
  },
  {
    question: "How can I track my progress?",
    answer:
      "The platform lets you set goals, log study sessions, and monitor your learning progress with peers.",
  },
  {
    question: "Where can I get help?",
    answer:
      "Visit our Help & Support page for FAQs, tutorials, and contact options.",
  },
];

export default function FAQSection() {
  return (
    <section className='bg-gray-50 py-20'>
      <div className='mx-auto px-4 max-w-5xl'>
        <h2 className='font-bold text-gray-800 text-3xl sm:text-4xl text-center'>
          Frequently Asked Questions
        </h2>
        <p className='mt-4 mb-8 text-gray-600 text-center'>
          Have questions? Find answers here or reach out to our support team.
        </p>

        <Accordion type='single' collapsible className='space-y-2'>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className='mt-8 text-center'>
          <Link to='/help'>
            <Button variant='outline'>Go to Help & Support</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
