import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import {
  TProps
} from "@/libs/type";
import { ChipStack } from "./chip-stack";

export function About(props: TProps) {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-[var(--color-primary-dark)] dark:text-white">About Me</h2>
      <div className="flex flex-col md:flex-row items-center md:space-x-12">
        <div className="md:w-1/3 mb-8 md:mb-0">
          <Image src={props.about.profileImage} alt="Sutralia's Avatar" width={250} height={250} className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg border-4 border-[var(--color-primary-light)] dark:border-[var(--color-primary-accent)]" />
        </div>
        <div className="md:w-2/3 text-lg leading-relaxed">
          <div className="mb-6 prose dark:prose-invert">
            <ReactMarkdown>{props.about.profileCoverText}</ReactMarkdown>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-[var(--color-primary-accent)] dark:text-white">Core Tech Stack:</h3>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {
              props.about.coreStack.map((stack, idx) => (
                <ChipStack key={idx} name={stack.name} icon={stack.icon || ''} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
