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
      <section className='text-center'>
        <LifeBuoy className='mx-auto text-ring' size={48} />
        <h1 className='mt-4 font-bold text-muted-foreground sm:text-3xl text-4xl'>
          Help & Support
        </h1>
        <p className='mx-auto mt-2 max-w-2xl text-ring text-lg'>
          Need help? Find answers to common questions or reach out to our
          support team.
        </p>
      </section>

      <section>
        <h2 className='mb-6 font-bold text-muted-foreground text-3xl sm:text-4xl text-center'>
          Frequently Asked Questions
        </h2>
        <Accordion type='single' collapsible className='space-y-4'>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className='font-semibold text-muted-foreground text-lg sm:text-xl hover:cursor-pointer'>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className='text-ring text-sm sm:text-lg'>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className='items-start gap-12 grid lg:grid-cols-2'>
        <Card className='p-6 border glass'>
          <CardHeader>
            <CardTitle className='font-bold text-muted-foreground text-2xl'>
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <p className='text-ring'>
              Have questions or need assistance? Send us a message and we’ll get
              back to you as soon as possible.
            </p>
            <form className='space-y-4'>
              <Input type='text' placeholder='Your Name' required />
              <Input type='email' placeholder='Your Email' required />
              <Textarea placeholder='Your Message' required rows={4} />
              <Button
                type='submit'
                variant='outline'
                className='w-full hover:cursor-pointer'
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className='px-6 py-18 border glass'>
          <CardHeader>
            <CardTitle className='font-bold text-muted-foreground text-2xl'>
              Support Resources
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex items-center gap-4'>
              <Mail className='text-ring' />
              <div>
                <p className='font-semibold text-muted-foreground'>
                  Email Support
                </p>
                <p className='text-ring text-sm'>support@studymate.com</p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <PhoneCall className='text-ring' />
              <div>
                <p className='font-semibold text-muted-foreground'>Call Us</p>
                <p className='text-ring text-sm'>+1 (800) 123-4567</p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <LifeBuoy className='text-ring' />
              <div>
                <p className='font-semibold text-muted-foreground'>
                  Knowledge Base
                </p>
                <p className='text-ring text-sm'>
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
