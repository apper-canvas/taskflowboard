import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const FilterTabs = ({
  activeFilter,
  onFilterChange,
  counts = {},
  className = ''
}) => {
  const filters = [
    { id: 'all', label: 'All Tasks', icon: 'List' },
    { id: 'pending', label: 'Pending', icon: 'Clock' },
    { id: 'completed', label: 'Completed', icon: 'CheckCircle' },
    { id: 'high', label: 'High Priority', icon: 'AlertCircle' }
  ]

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onFilterChange(filter.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeFilter === filter.id
              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-soft'
              : 'bg-white text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50 border border-neutral-200'
          }`}
        >
          <ApperIcon name={filter.icon} size={16} />
          <span>{filter.label}</span>
          {counts[filter.id] !== undefined && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeFilter === filter.id
                ? 'bg-white/20 text-white'
                : 'bg-neutral-100 text-neutral-600'
            }`}>
              {counts[filter.id]}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  )
}

export default FilterTabs