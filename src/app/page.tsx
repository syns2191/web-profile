import { Chats } from "@/components/chat";
import { SkillList } from "@/components/skill.component";
import { GithubActivityGraph } from "@/components/github-activity-graph";
import { ProjectList } from "@/components/projects";
import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SectionTransition } from "@/components/section-transition";
import { getProfile } from "@/libs/api";
import { parseToAbout, parseToContact, parseToHeroData } from "@/libs/data-parse";

export default async function Home() {
  const profile = await getProfile();
  const hero = parseToHeroData(profile);
  const contact = parseToContact(profile);
  const about = parseToAbout(profile);

  return (
    <div className="font-sans text-[var(--color-primary-dark)] bg-white">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <SectionTransition animation="animate-fade-in">
        <section id="hero" className="hero-gradient text-white py-20 md:py-32 text-center min-h-screen flex items-center justify-center"
          style={{ background: 'linear-gradient(to right, var(--color-primary-medium), var(--color-primary-accent))' }}> {/* Inline style for gradient */}
          <Hero profile={hero} />
        </section>
      </SectionTransition>

      {/* About Section */}
      <SectionTransition animation="animate-slide-up">
        <section id="about" className="py-16 md:py-24 bg-[var(--color-primary-light)] dark:bg-[var(--color-primary-medium)]">
          <About about={about} />
        </section>
      </SectionTransition>

      {/* Projects Section */}
      <SectionTransition animation="animate-slide-up">
        <section id="projects" className="py-16 md:py-24 bg-white dark:bg-[var(--color-primary-dark)]">
          <ProjectList userId={profile?._id || ''}/>
        </section>
      </SectionTransition>
      <SectionTransition animation="animate-slide-up">
        <section id="skills" className="py-16 md:py-24 bg-[var(--color-primary-light)] dark:bg-[var(--color-primary-medium)]">
          {/* Skills Section */}
          <SkillList userId={profile._id || ''} />
        </section>
      </SectionTransition>

      {/* GitHub Activity Section */}
      <SectionTransition animation="animate-slide-up">
        <section id="github-activity" className="py-16 md:py-24 bg-white dark:bg-[var(--color-primary-dark)]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 text-[var(--color-primary-dark)] dark:text-white">My GitHub Activity</h2>
            <GithubActivityGraph username={profile.githubUsername || ''} /> {/* Replace 'octocat' with your GitHub username */}
          </div>
        </section>
      </SectionTransition>

      {/* Posts Section */}

      {/* Contact Section */}
      <SectionTransition animation="animate-slide-up">
        <section id="contact" className="py-16 md:py-24 bg-white dark:bg-[var(--color-primary-dark)]">
          <Contact contact={contact} />
        </section>
      </SectionTransition>

      {/* Footer */}
      <footer className="bg-[var(--color-primary-medium)] dark:bg-[var(--color-primary-dark)] text-white py-6 text-center text-sm">
        <div className="flex item-center justify-center"><ThemeSwitcher /></div>
        <Footer />
      </footer>
      {/* Chats */}
      <Chats userId={profile?._id || ''}/>
    </div>
  );
}
