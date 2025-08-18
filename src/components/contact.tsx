import { TPropsContact } from "@/libs/type"
export function Contact(props: TPropsContact) {
  return (
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-8 text-[var(--color-primary-dark)] dark:text-white">Let’s work together.</h2>
      <p className="text-lg mb-10 max-w-xl mx-auto text-[var(--color-primary-dark)] dark:text-white">
        I&apos;m always open to new opportunities and collaborations. Whether you have a project in mind or just want to connect, feel free to reach out!
      </p>
      <a href={`mailto:${props.contact.email}`} className="inline-block bg-[var(--color-primary-accent)] hover:bg-[var(--color-primary-medium)] text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
        Email Me
      </a>
      <div className="flex justify-center space-x-6 mt-10">
        <a href={props.contact.github} target="_blank" className="text-[var(--color-primary-dark)] hover:text-[var(--color-primary-accent)] dark:text-white dark:hover:text-white transition-colors duration-300">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.47.087.68-.217.68-.483 0-.237-.008-.865-.013-1.7c-2.782.602-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.618.069-.606.069-.606 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.089 2.91.835.09-.645.35-1.089.636-1.338-2.22-.253-4.555-1.113-4.555-4.953 0-1.096.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.428 9.428 0 0112 6.844c.85.004 1.7.117 2.49.386 1.91-1.296 2.75-1.025 2.75-1.025.546 1.379.203 2.398.098 2.65.64.7 1.028 1.592 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.206.579.688.482C19.137 20.19 22 16.422 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
        </a>
        <a href={props.contact.linkedin} target="_blank" className="text-[var(--color-primary-dark)] hover:text-[var(--color-primary-accent)] dark:text-white dark:hover:text-white transition-colors duration-300">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M0 0h24v24H0z" fill="none" /><path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-11 19H5V8h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3V13.5c0-.834-.676-1.5-1.5-1.5s-1.5.666-1.5 1.5v5.5h-3V8h3v2.382c.57-.888 1.59-1.382 2.618-1.382 2.761 0 5 2.239 5 5v6z" /></svg>
        </a>
        <a href={props.contact.x} target="_blank" className="text-[var(--color-primary-dark)] hover:text-[var(--color-primary-accent)] dark:text-white dark:hover:text-white transition-colors duration-300">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.37-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.1 5.4 7.5 3.5 4.7c-.36.62-.56 1.35-.56 2.13 0 1.49.75 2.81 1.91 3.56-.7-.02-1.37-.2-1.95-.5v.05c0 2.07 1.47 3.8 3.42 4.19-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.54 1.7 2.11 2.92 3.97 2.95-1.46 1.14-3.3 1.83-5.3 1.83-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c9.73 0 15.01-8.05 15.01-15.01 0-.23-.01-.46-.02-.69.82-.59 1.53-1.33 2.09-2.17z" /></svg>
        </a>
      </div>
    </div>
  )
}
