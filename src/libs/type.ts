export type TStackItem = {
  name: string;
  icon?: string;
}

export type TAbout = {
  profileImage: string;
  profileBrand?: string;
  profileDescription?: string;
  profileCoverText?: string;
  coreStack: TStackItem[];
}

export type TProps = {
  about: TAbout
}

export type THeroProfile = {
  profileName: string;
  profileBranding: string;
  profileDescription: string;
}

export type TPropsHero = {
  profile:THeroProfile;
}

export type TProjects = {
  projectTitle: string;
  projectShortDescription: string;
  projectTechs: TStackItem[];
  projectCodeLink: string;
  projectDemoLink: string;
  projectSnapshot: string;
}

export type TPropsProject = {
  projects: TProjects[];
}

export type TStackCategories = {
  stackCategoryName: string;
  stacks: TStack[]
}

export type TStack = {
  stackName: string;
  stackIcon: string;
}

export type TPropsSkills = {
  skills: TStackCategories[];
}

export type TContacts = {
  email: string;
  github: string;
  linkedin: string;
  x: string;
}

export type TPropsContact = {
  contact: TContacts;
}

export type TConfig = {
  NEXT_PUBLIC_API_URL: string;
}
