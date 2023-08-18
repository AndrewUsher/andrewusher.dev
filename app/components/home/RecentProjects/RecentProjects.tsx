import React from 'react'
import { motion } from 'framer-motion'
import { Projects } from '~/components/shared/Projects/Projects'
import { Project } from '~/types/contentful'

type Props = {
  projects: Omit<Project, 'date'>[]
}

export function RecentProjects({ projects }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 400 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, stiffness: 50, delay: 0.2 }}
    >
      <h2 className="mb-8 text-4xl font-bold tracking-tight dark:text-white">
        Recent Projects
      </h2>
      <Projects projects={projects} />
    </motion.section>
  )
}
