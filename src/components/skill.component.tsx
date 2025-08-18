import { TPropsSkills, TStack, TStackCategories } from "@/libs/type"
import { SectionTransition } from "./section-transition"
import { getSkill } from "@/libs/api";
import { parseToSkillSet } from "@/libs/data-parse";
import { ChipStack } from "./chip-stack";

type TPropSkill = {
  userId: string;
}

export async function SkillList(props: TPropSkill) {
  const skillSet = await getSkill(props.userId);
  const skills = parseToSkillSet(skillSet);
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-[var(--color-primary-dark)] dark:text-white">My Skills</h2>
      <SectionTransition animation="ease-in" threshold={0.5}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {
            skills.map((skill: TStackCategories, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-semibold mb-4 text-[var(--color-primary-accent)] dark:text-white">{skill.stackCategoryName}</h3>
                <div className="flex flex-wrap gap-3">
                  {
                    skill.stacks.map((stack: TStack, stckIdx) => (
                      <ChipStack key={stckIdx} name={stack.stackName} icon={stack.stackIcon} />
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </SectionTransition>

    </div>
  )
}
