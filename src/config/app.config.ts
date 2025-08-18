import { TAbout, TContacts, THeroProfile, TStackCategories, TProjects, TConfig } from "@/libs/type";

export const profileData: TAbout = {
  profileImage: '/avatar.png',
  profileCoverText: 'As a full-stack developer, I thrive on bringing innovative digital solutions to life. My journey in software development has equipped me with a unique blend of front-end aesthetics and back-end robustness, allowing me to build comprehensive applications from concept to deployment. I am committed to writing clean, maintainable, and efficient code that stands the test of time.\n\nI believe in a holistic approach to development, focusing not just on functionality but also on user experience and system scalability. My passion lies in solving challenging problems and continuously learning new technologies to deliver cutting-edge solutions.',
  coreStack: [
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'React.js', icon: 'react' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'Postgresql', icon: 'postgresql' },
    { name: 'Redis', icon: 'redis' },
    { name: 'MongoDb', icon: 'mongodb' }
  ]
}

export const contact: TContacts = {
  github: 'https://github.com/sutralia',
  linkedin: 'https://linkedin.com/in/sutralia',
  x: 'https://twitter.com/sutralia',
  email: 'your.email@example.com'
}

export const hero: THeroProfile = {
  profileName: 'Sutralia',
  profileBranding: 'Full-Stack Developer | Building scalable, elegant solutions',
  profileDescription: `I&apos;m a passionate full-stack developer dedicated to crafting robust and user-friendly web applications.
      My expertise lies in transforming complex ideas into clean, efficient, and scalable code.`
};

export const stack: TStackCategories[] = [
  {
    stackCategoryName: 'Frontend',
    stacks: [
      {
        stackName: 'React.js',
        stackIcon: 'react'
      },
      {
        stackName: 'Angular.js',
        stackIcon: 'angular'
      },
      {
        stackName: 'Next.js',
        stackIcon: 'nextjs'
      },
      {
        stackName: 'TailwindCSS',
        stackIcon: 'tailwindcss'
      }
    ]
  },
  {
    stackCategoryName: 'Backend',
    stacks: [
      {
        stackName: 'React.js',
        stackIcon: 'react'
      },
      {
        stackName: 'Angular.js',
        stackIcon: 'angular'
      },
      {
        stackName: 'Next.js',
        stackIcon: 'nextjs'
      },
      {
        stackName: 'TailwindCSS',
        stackIcon: 'tailwindcss'
      }
    ]
  },
  {
    stackCategoryName: 'Database',
    stacks: [
      {
        stackName: 'React.js',
        stackIcon: 'react'
      },
      {
        stackName: 'Angular.js',
        stackIcon: 'angular'
      },
      {
        stackName: 'Next.js',
        stackIcon: 'nextjs'
      },
      {
        stackName: 'TailwindCSS',
        stackIcon: 'tailwindcss'
      }
    ]
  },
  {
    stackCategoryName: 'DevOps',
    stacks: [
      {
        stackName: 'React.js',
        stackIcon: 'react'
      },
      {
        stackName: 'Angular.js',
        stackIcon: 'angular'
      },
      {
        stackName: 'Next.js',
        stackIcon: 'nextjs'
      },
      {
        stackName: 'TailwindCSS',
        stackIcon: 'tailwindcss'
      }
    ]
  },
];

export const projects: TProjects[] = [
  {
    projectDemoLink: 'https://github.com/ever/ever-gauzy.git',
    projectTitle: 'Ever Gauzy',
    projectShortDescription: 'Ever Gauzy is opensource crm',
    projectCodeLink: 'https://github.com/syns2191/ever-gauzy.git',
    projectSnapshot: 'https://camo.githubusercontent.com/75e0ee3e57031484cef86a174583151fa65441e016f2a1cd3bf3c6edfb37bc77/68747470733a2f2f646f63732e6761757a792e636f2f6f766572766965772e706e67',
    projectTechs: [
      { name: 'NestJS', icon: 'nestjs' },
      { name: 'Angular', icon: 'angular' },
      { name: 'Electron', icon: 'electron' },
      { name: 'PostgreSQL', icon: 'postgresql' }
    ]
  },
  {
    projectDemoLink: 'https://github.com/ever/ever-teams.git',
    projectTitle: 'Ever Teams',
    projectShortDescription: 'A scalable e-commerce platform with real-time inventory management.',
    projectCodeLink: 'https://github.com/syns2191/ever-gauzy.git',
    projectSnapshot: 'https://camo.githubusercontent.com/b2c9625b8a0b52b5bb9eb40d6f892de2000f190fa0198ceba6ed92e668ffc6eb/68747470733a2f2f646f63732e657665722e7465616d2f7765622f6f766572766965772e706e67',
    projectTechs: [
      { name: 'React', icon: 'react' },
      { name: 'Electron', icon: 'electron' },
      { name: 'PostgreSQL', icon: 'postgresql' }
    ]
  },
];

export const config: TConfig = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3034'
}
