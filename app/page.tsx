"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  FileStack,
  FileText,
  Globe,
  Lock,
  Users,
  Zap,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ROUTES } from "@/lib/constant";

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping && index < text.length) {
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 80); // Typing speed: 80ms per character
    } else if (index === text.length) {
      timeout = setTimeout(() => {
        setIsTyping(false);
        setDisplayText("");
        setIndex(0);
      }, 2000); // Pause for 2 seconds before restarting
    } else if (!isTyping && index === 0) {
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, 500); // Brief pause before starting new cycle
    }

    return () => clearTimeout(timeout);
  }, [index, isTyping, text]);

  return (
    <span className="relative inline-block">
      {displayText}
      <motion.span
        className="inline-block w-1 h-10 bg-white ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.5 }}
      />
    </span>
  );
};

export default function Home() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const headingText = "Ready to Transform Your  ";
  const testimonials = [
    {
      name: "John Doe",
      role: "Freelancer",
      content: "This platform revolutionized my invoicing. Fast and reliable!",
      avatar: "/placeholder-avatar-1.jpg",
    },
    {
      name: "Jane Smith",
      role: "Small Business Owner",
      content: "Intuitive interface and secure payments. Highly recommended!",
      avatar: "/placeholder-avatar-2.jpg",
    },
    {
      name: "Mike Johnson",
      role: "Agency Director",
      content:
        "Streamlined our entire billing process. Saved hours every week.",
      avatar: "/placeholder-avatar-3.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold flex items-center"
          >
            <FileStack className="mr-2 text-gray-300" />
            Invoice Platform
          </motion.div>
          <Link href={ROUTES.PUBLIC.LOGIN}>
            <Button className="hidden md:inline-block bg-white text-black hover:bg-gray-200">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TypewriterText text={headingText} />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
            Invoicing?
          </span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Create, manage, and track invoices with unparalleled ease and
          security.
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4 relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href={ROUTES.PUBLIC.LOGIN}>
            <Button className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 flex items-center">
              Get Started Free
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={ref}
        className="py-20 px-4 md:px-8 bg-black/50"
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Powerful Features
        </motion.h2>
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {[
            {
              title: "Lightning-Fast Invoicing",
              content:
                "Generate professional invoices in seconds with AI-powered templates.",
              icon: Zap,
            },
            {
              title: "Real-Time Collaboration",
              content: "Share and edit invoices with your team in real-time.",
              icon: Users,
            },
            {
              title: "Secure Payment Integration",
              content: "Accept payments from anywhere with top-tier security.",
              icon: Lock,
            },
          ].map((feature, index) => (
            <motion.div key={index} variants={textVariants}>
              <Card className="bg-gray-900/80 border-gray-700 hover:shadow-lg hover:shadow-gray-500/20 transition-shadow duration-300">
                <CardHeader className="flex items-center">
                  <feature.icon className="w-8 h-8 mr-3 text-gray-300" />
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  {feature.content}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 md:px-8">
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Why Choose Us?
        </motion.h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              icon: CheckCircle,
              title: "Intuitive Design",
              content: "User-friendly interface that requires no training.",
            },
            {
              icon: Globe,
              title: "Global Reach",
              content: "Support for multiple currencies and languages.",
            },
            {
              icon: DollarSign,
              title: "Cost-Effective",
              content: "Save time and money with automated processes.",
            },
            {
              icon: FileText,
              title: "Custom Reports",
              content: "Generate insightful reports with ease.",
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <benefit.icon className="w-10 h-10 text-gray-300 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 md:px-8 bg-black/50">
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          What Our Users Say
        </motion.h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/80 border-gray-700">
                <CardContent className="pt-6">
                  <p className="text-gray-300 mb-6 italic">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2025 InvoicePro. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
