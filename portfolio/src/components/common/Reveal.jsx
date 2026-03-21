import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, when: 'beforeChildren', duration: 0.65 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Reveal({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
    >
      {children &&
        children instanceof Array
        ? children.map((child, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}

export function RevealItem({ children }) {
  return (
    <motion.div variants={itemVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {children}
    </motion.div>
  )
}

