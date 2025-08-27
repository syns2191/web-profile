export type TProfileResponse = {
  _id: string,
  avatar: string;
  displayName: string;
  email: string;
  github: string;
  githubUsername: string;
  linkedind: string;
  profileBranding: string;
  profileDescription: string;
  profileCoverText: string;
  x: string;
  skills: {
    stackName: string;
    stackIcon: string;
  }[]
}

export interface IProjectResponse {
  projectTitle: string;
  projectShortDescription: string;
  projectImage: string;
  projectDemoLink: string;
  projectCodeLink: string;
  projectTeachStack: ProjectTeachStack[];
  user: string;
}

export interface ProjectTeachStack {
  stackName: string;
  stackIcon: string;
}

export interface IProfileSkills {
    _id:      string;
    skillSet: SkillSet[];
}

export interface SkillSet {
    _id:          string;
    categoryName: string;
    skills:       Skill[];
}

export interface Skill {
    _id:       string;
    stackName: string;
    __v:       number;
    stackIcon: string;
}

