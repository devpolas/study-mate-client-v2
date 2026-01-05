import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, PhoneCall, LifeBuoy } from "lucide-react";

export default function SupportPage() {
  const faqs = [
    {
      question: "How do I find study partners?",
      answer:
        "You can search for peers by subject, learning style, or location. Once you find someone, you can send a friend request to start collaborating.",
    },
    {
      question: "Can I organize offline study sessions?",
      answer:
        "Yes! StudyMate allows you to connect with local students. You can organize offline study sessions once both parties accept the collaboration.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Go to your profile, navigate to Security, and update your password. Ensure it meets our security requirements.",
    },
    {
      question: "How do I report an issue or bug?",
      answer:
        "Use the contact form below or email us at support@studymate.com. Our team will respond within 24 hours.",
    },
  ];

  return (
    <div className='space-y-16 mx-auto px-6 py-12 max-w-7xl'>
      {/* Hero / Banner */}
      <section className='text-center'>
        <LifeBuoy className='mx-auto text-indigo-600' size={48} />
        <h1 className='mt-4 font-bold text-gray-800 text-4xl'>
          Help & Support
        </h1>
        <p className='mx-auto mt-2 max-w-2xl text-gray-600 text-lg'>
          Need help? Find answers to common questions or reach out to our
          support team.
        </p>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className='mb-6 font-bold text-gray-800 text-3xl text-center'>
          Frequently Asked Questions
        </h2>
        <Accordion type='single' collapsible className='space-y-4'>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className='font-semibold text-gray-800'>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className='text-gray-600'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Contact Form */}
      <section className='items-start gap-12 grid lg:grid-cols-2'>
        <Card className='p-6 border-gray-200'>
          <CardHeader>
            <CardTitle className='font-bold text-gray-800 text-2xl'>
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-gray-600'>
              Have questions or need assistance? Send us a message and we’ll get
              back to you as soon as possible.
            </p>
            <form className='space-y-4'>
              <Input type='text' placeholder='Your Name' required />
              <Input type='email' placeholder='Your Email' required />
              <Textarea placeholder='Your Message' required rows={4} />
              <Button type='submit' className='w-full'>
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Support Resources */}
        <Card className='bg-gray-50 p-6 border-gray-200'>
          <CardHeader>
            <CardTitle className='font-bold text-gray-800 text-2xl'>
              Support Resources
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex items-center gap-4'>
              <Mail className='text-indigo-600' />
              <div>
                <p className='font-semibold text-gray-800'>Email Support</p>
                <p className='text-gray-600 text-sm'>support@studymate.com</p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <PhoneCall className='text-indigo-600' />
              <div>
                <p className='font-semibold text-gray-800'>Call Us</p>
                <p className='text-gray-600 text-sm'>+1 (800) 123-4567</p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <LifeBuoy className='text-indigo-600' />
              <div>
                <p className='font-semibold text-gray-800'>Knowledge Base</p>
                <p className='text-gray-600 text-sm'>
                  Browse tutorials and guides to solve common issues.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
