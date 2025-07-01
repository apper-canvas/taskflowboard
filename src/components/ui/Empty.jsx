import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No tasks yet", 
  description = "Create your first task to get started with organizing your day",
  actionText = "Add Task",
  onAction,
  icon = "CheckSquare",
  className = ""
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-8 text-center ${className}`}
    >
      <div className="w-24 h-24 bg-gradient-to-br from-primary-100 via-secondary-100 to-primary-200 rounded-full flex items-center justify-center mb-6 shadow-soft">
        <ApperIcon name={icon} size={40} className="text-primary-600" />
      </div>
      
      <h3 className="text-xl font-bold text-neutral-800 mb-3">
        {title}
      </h3>
      
      <p className="text-neutral-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-soft hover:shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <ApperIcon name="Plus" size={18} className="inline mr-2" />
          {actionText}
        </motion.button>
      )}
    </motion.div>
  )
}

export default Empty