import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from '@/components/organisms/TaskCard'
import Empty from '@/components/ui/Empty'

const TaskList = ({
  tasks = [],
  categories = [],
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onAddTask,
  emptyMessage = "No tasks found",
  emptyDescription = "Create your first task to get started with organizing your day",
  className = ''
}) => {
  if (tasks.length === 0) {
    return (
      <Empty
        title={emptyMessage}
        description={emptyDescription}
        onAction={onAddTask}
        icon="CheckSquare"
        className={className}
      />
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.05,
              ease: "easeOut"
            }}
          >
            <TaskCard
              task={task}
              categories={categories}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TaskList