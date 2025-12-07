import { motion } from 'framer-motion'

export function HomepageIntro() {
  return (
    <section className="dark:prose-invert prose lg:prose-xl">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Greetings! I am a systems engineer at{' '}
        <a href="https://autozone.com" className="underline">
          AutoZone
        </a>
        , where I lead a team of React developers in the development of the B2C
        web application. In my leisure time, I enjoy experimenting with new
        front-end technologies by creating personal projects. Outside of work, I
        engage in physical activities such as basketball and cycling in downtown
        Memphis. For additional information about me, please refer to my
        profile.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <a className="underline" href="/about">
          Read more about me here.
        </a>
      </motion.p>
    </section>
  )
}
