import StackIcon from "tech-stack-icons";

type TChipStack = {
  name: string;
  icon: string;
}
export function ChipStack(props: TChipStack) {
  return (
    <span className="flex items-center bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] text-sm font-medium px-3 py-1 rounded-full dark:bg-[var(--color-primary-dark)] dark:text-white">
      {props.icon && (
        <StackIcon name={props.icon} className="w-4 mr-2" />
      )}
      {props.name}
    </span>
  )
}
