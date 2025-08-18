import { TPropsHero } from "@/libs/type";
export function Hero(props: TPropsHero) {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">Hi, I&apos;m {props.profile.profileName}</h1>
      <p className="text-xl md:text-3xl mb-6 font-light">{props.profile.profileBranding}</p>
      <p className="max-w-2xl mx-auto text-lg md:text-xl mb-10">
        {props.profile.profileDescription}
      </p>
      <a href="#projects" className="bg-white text-[var(--color-primary-accent)] hover:bg-[var(--color-primary-light)] px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
        View My Work
      </a>
    </div>
  )
}
