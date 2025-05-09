import { Github, Mail, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContactForm from "@/components/contact-form"
import AnimatedSection from "@/components/animated-section"
import AnimatedProjectCard from "@/components/animated-project-card"
import AnimatedSkillCard from "@/components/animated-skill-card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center gap-8">
        <AnimatedSection direction="left" className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Hi, I'm <span className="text-emerald-600 dark:text-emerald-500">Felix Niyonteze</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Full-stack developer specializing in web and mobile applications with expertise in Flutter, React, Django,
            and Node.js.
          </p>
          <div className="flex flex-wrap gap-3">
            <AnimatedSection delay={0.2}>
              <Button asChild>
                <Link href="#contact">Get in Touch</Link>
              </Button>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <Button variant="outline" asChild>
                <Link href="https://github.com/nifelix97" target="_blank" className="flex items-center gap-2">
                  <Github size={18} /> GitHub
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </AnimatedSection>
        <AnimatedSection direction="right" delay={0.2} className="md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-emerald-500 shadow-xl">
            <Image src="/images/profile.jpeg" alt="Felix Niyonteze" fill className="object-cover" priority />
          </div>
        </AnimatedSection>
      </section>

      {/* About Section */}
      <AnimatedSection id="about" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <AnimatedSection direction="left" className="space-y-6">
            <h3 className="text-2xl font-semibold">Background</h3>
            <p className="text-gray-600 dark:text-gray-300">
              I'm a final year IT student at the University of Rwanda with a passion for building innovative web and
              mobile applications. I've gained practical experience through internships and personal projects, focusing
              on creating user-friendly and efficient solutions.
            </p>
            <h3 className="text-2xl font-semibold">Education</h3>
            <div className="space-y-2">
              <p className="font-medium">University of Rwanda</p>
              <p className="text-gray-600 dark:text-gray-300">Bachelor's Degree in Information Technology</p>
              <p className="text-sm text-gray-500">Expected Graduation: 2025</p>
            </div>
            <h3 className="text-2xl font-semibold">Experience</h3>
            <div className="space-y-2">
              <p className="font-medium">Feli Technology</p>
              <p className="text-gray-600 dark:text-gray-300">Internship - Mobile App Developer</p>
              <p className="text-sm text-gray-500">Developed Feli Express e-commerce mobile app using Flutter</p>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.2}>
            <h3 className="text-2xl font-semibold mb-6">Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              <AnimatedSkillCard
                title="Frontend"
                skills={["HTML", "CSS", "JavaScript", "React", "Next.js", "Flutter"]}
                delay={0.1}
              />
              <AnimatedSkillCard
                title="Backend"
                skills={["Node.js", "Express", "Python", "Django", "RESTful APIs"]}
                delay={0.2}
              />
              <AnimatedSkillCard title="Mobile" skills={["Flutter", "Dart", "Mobile UI/UX"]} delay={0.3} />
              <AnimatedSkillCard title="Tools" skills={["Git", "GitHub", "VS Code", "Firebase"]} delay={0.4} />
            </div>
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection
        id="projects"
        className="container mx-auto px-4 py-16 md:py-24 bg-white dark:bg-gray-900 rounded-lg shadow-md"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">My Projects</h2>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full md:w-[400px] mx-auto grid-cols-2">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="all">All Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatedProjectCard
                title="Nexa Tech Hub"
                description="E-commerce platform for electronic products featuring product listings, shopping cart, and checkout functionality. Includes special deals and bundle offers."
                image="/images/nexa-tech.png"
                tags={["Next.js", "React", "Tailwind CSS"]}
                liveLink="https://nexa-tech-hub.vercel.app/"
                githubLink="https://github.com/nifelix97"
                delay={0.1}
              />

              <AnimatedProjectCard
                title="Tunganawe"
                description="Real estate platform for finding properties, including houses for rent, land parcels for sale, apartments, and vehicles. Features advanced search and filtering options."
                image="/images/tunganawe.png"
                tags={["React", "Node.js", "Express"]}
                liveLink="https://tunganawe.com"
                githubLink="https://github.com/nifelix97"
                delay={0.2}
              />

              <AnimatedProjectCard
                title="BTD App"
                description="Blood Transfusion Management application that connects donors with recipients. My final year project focused on improving the blood donation process and saving lives."
                image="/images/btd-app.png"
                tags={["Flutter", "Dart", "Firebase"]}
                githubLink="https://github.com/nifelix97"
                delay={0.3}
              />
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatedProjectCard
                title="Nexa Tech Hub"
                description="E-commerce platform for electronic products featuring product listings, shopping cart, and checkout functionality. Includes special deals and bundle offers."
                image="/images/nexa-tech.png"
                tags={["Next.js", "React", "Tailwind CSS"]}
                liveLink="https://nexa-tech-hub.vercel.app/"
                githubLink="https://github.com/nifelix97"
                delay={0.1}
              />

              <AnimatedProjectCard
                title="Tunganawe"
                description="Real estate platform for finding properties, including houses for rent, land parcels for sale, apartments, and vehicles. Features advanced search and filtering options."
                image="/images/tunganawe.png"
                tags={["React", "Node.js", "Express"]}
                liveLink="https://tunganawe.com"
                githubLink="https://github.com/nifelix97"
                delay={0.2}
              />

              <AnimatedProjectCard
                title="BTD App"
                description="Blood Transfusion Management application that connects donors with recipients. My final year project focused on improving the blood donation process and saving lives."
                image="/images/btd-app.png"
                tags={["Flutter", "Dart", "Firebase"]}
                githubLink="https://github.com/nifelix97"
                delay={0.3}
              />

              <AnimatedProjectCard
                title="Feli Express"
                description="E-commerce mobile application with 'Discover | Click | Receive' functionality developed during my internship at Feli Technology. Features a clean, modern interface with easy navigation."
                image="/images/feli-express.png"
                tags={["Flutter", "Dart", "REST API"]}
                githubLink="https://github.com/nifelix97"
                delay={0.4}
              />
            </div>
          </TabsContent>
        </Tabs>
      </AnimatedSection>

      {/* GitHub Section */}
      <AnimatedSection id="github" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">GitHub Activity</h2>
        <div className="flex flex-col items-center">
          <AnimatedSection
            direction="up"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-3xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">Recent Repositories</h3>
              <Button variant="outline" asChild>
                <Link href="https://github.com/nifelix97" target="_blank" className="flex items-center gap-2">
                  <Github size={18} /> View Profile
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              <AnimatedGitHubRepo
                name="btd_app"
                description="Blood Transfusion Management Application - Final Year Project"
                language="Dart"
                stars={0}
                forks={0}
                delay={0.1}
              />
              <AnimatedGitHubRepo
                name="nexa-tech-hub"
                description="E-commerce website for electronic products"
                language="JavaScript"
                stars={0}
                forks={0}
                delay={0.2}
              />
              <AnimatedGitHubRepo
                name="tunganawe-platform"
                description="Community engagement web platform"
                language="JavaScript"
                stars={0}
                forks={0}
                delay={0.3}
              />
            </div>
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection
        id="contact"
        className="container mx-auto px-4 py-16 md:py-24 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <AnimatedSection direction="left" className="space-y-6">
            <h3 className="text-2xl font-semibold">Contact Information</h3>
            <div className="space-y-4">
              <AnimatedSection delay={0.1} className="flex items-center gap-3">
                <Mail className="text-emerald-600 dark:text-emerald-500" />
                <a
                  href="mailto:nifelix97@gmail.com"
                  className="hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
                >
                  nifelix97@gmail.com
                </a>
              </AnimatedSection>
              <AnimatedSection delay={0.2} className="flex items-center gap-3">
                <Github className="text-emerald-600 dark:text-emerald-500" />
                <a
                  href="https://github.com/nifelix97"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
                >
                  github.com/nifelix97
                </a>
              </AnimatedSection>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.3}>
            <ContactForm />
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Felix Niyonteze. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink?: string;
  githubLink: string;
}

function ProjectCard({ title, description, image, tags, liveLink, githubLink }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 mt-auto">
        {liveLink && (
          <Button variant="outline" size="sm" asChild>
            <Link href={liveLink} target="_blank" className="flex items-center gap-1">
              <ExternalLink size={14} /> Live
            </Link>
          </Button>
        )}
        <Button variant="outline" size="sm" asChild>
          <Link href={githubLink} target="_blank" className="flex items-center gap-1">
            <Github size={14} /> Code
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function GitHubRepo({ name, description, language, stars, forks }: { name: string; description: string; language: string; stars: number; forks: number }) {
  return (
    <div className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-emerald-600 dark:text-emerald-500">{name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`https://github.com/nifelix97/${name}`} target="_blank">
            <Github size={16} />
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          {language}
        </span>
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-star"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          {stars}
        </span>
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-git-fork"
          >
            <circle cx="12" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <circle cx="18" cy="6" r="3" />
            <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
            <path d="M12 12v3" />
          </svg>
          {forks}
        </span>
      </div>
    </div>
  )
}

interface AnimatedGitHubRepoProps {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  delay?: number;
}

function AnimatedGitHubRepo({ name, description, language, stars, forks, delay = 0 }: AnimatedGitHubRepoProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium text-emerald-600 dark:text-emerald-500">{name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`https://github.com/nifelix97/${name}`} target="_blank">
              <Github size={16} />
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            {language}
          </span>
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-star"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {stars}
          </span>
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-git-fork"
            >
              <circle cx="12" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="6" r="3" />
              <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
              <path d="M12 12v3" />
            </svg>
            {forks}
          </span>
        </div>
      </div>
    </AnimatedSection>
  )
}
