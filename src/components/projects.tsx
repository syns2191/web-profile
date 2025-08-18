import Image from "next/image";
import { SectionTransition } from "./section-transition";
import { TPropsProject } from "@/libs/type";
import { getProjects } from "@/libs/api";
import { parseToProject } from "@/libs/data-parse";
import { ChipStack } from "./chip-stack";

type TPropProject = {
  userId: string
}

export async function ProjectList(props: TPropProject) {
  const projectResp = await getProjects(props.userId);
  const projects = parseToProject(projectResp)
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-[var(--color-primary-dark)] dark:text-white">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Project Card 1 */}
        {projects.map((project, idx) => (
          <SectionTransition animation="ease" key={idx}>
            <div className="bg-[var(--color-primary-light)] dark:bg-[var(--color-primary-medium)] rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Image src={project.projectSnapshot} alt={project.projectTitle} width={400} height={250} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-[var(--color-primary-accent)] dark:text-white">{project.projectTitle}</h3>
                <p className="text-[var(--color-primary-dark)] dark:text-white mb-4">{project.projectShortDescription}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {
                    project.projectTechs.map((stack, idx) => (
                      <ChipStack key={idx} name={stack.name} icon={stack.icon || ''} />
                  ))
                }
                </div>
                <div className="flex justify-between mt-5">
                  <a href={project.projectCodeLink} target="_blank" className="text-[var(--color-primary-accent)] hover:underline dark:text-white">View Code</a>
                  <a href={project.projectDemoLink} target="_blank" className="text-[var(--color-primary-accent)] hover:underline dark:text-white">Live Demo</a>
                </div>
              </div>
            </div>
          </SectionTransition>
        ))}
      </div>
    </div>
  )
}
