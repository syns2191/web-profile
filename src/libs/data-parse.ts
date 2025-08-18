import { TAbout, TContacts, THeroProfile, TProjects, TStackCategories } from "./type";
import { IProfileSkills, IProjectResponse, TProfileResponse } from "./type-api-reponse";

export const parseToHeroData = (profileResp: Partial<TProfileResponse>): THeroProfile => ({
  profileName: profileResp?.displayName || '',
  profileBranding: profileResp?.profileBranding || '',
  profileDescription: profileResp?.profileDescription || ''
});

export const parseToContact = (profileResp: Partial<TProfileResponse>): TContacts => ({
  email: profileResp?.email || '',
  linkedin: profileResp.linkedind || '',
  github: profileResp?.github || '',
  x: profileResp?.x || ''
});

export const parseToAbout = (profileResp: Partial<TProfileResponse>): TAbout => ({
  profileImage: profileResp?.avatar || '/avatar.png',
  profileCoverText: profileResp?.profileCoverText,
  coreStack: profileResp.skills?.map((skill) => ({
    name: skill.stackName,
    icon: skill.stackIcon
  })) || []
});

export const parseToProject = (projectResponse: IProjectResponse[]): TProjects[] => {
  return projectResponse.map((project) => ({
    projectSnapshot: project.projectImage,
    projectTitle: project.projectTitle,
    projectDemoLink: project.projectDemoLink,
    projectCodeLink: project.projectCodeLink,
    projectTechs: project.projectTeachStack.map((stack) => ({
      name: stack.stackName,
      icon: stack.stackIcon
    })),
    projectShortDescription: project.prejectShortDescription
  }))
}

export const parseToSkillSet = (profileSkillSet: Partial<IProfileSkills>): TStackCategories[] => {
  return (profileSkillSet?.skillSet || []).map((skill) => ({
    stackCategoryName: skill.categoryName || '',
    stacks: skill.skills.map((stack) => ({
      stackName: stack.stackName || '',
      stackIcon: stack.stackIcon || ''
    }))
  }))
}
