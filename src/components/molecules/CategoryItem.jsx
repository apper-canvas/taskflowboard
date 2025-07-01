import React from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const CategoryItem = ({ category, count = 0, isActive = false }) => {
  const linkPath = category.Id === 'all' ? '/' : `/category/${category.Id}`

  return (
    <NavLink
      to={linkPath}
      className={({ isActive: routeIsActive }) => 
        `block w-full ${routeIsActive || isActive ? 'bg-gradient-to-r from-primary-50 to-secondary-50' : ''}`
      }
    >
      <motion.div
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 group"
      >
        <div className="flex items-center space-x-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-soft"
            style={{ backgroundColor: category.color || '#5B4EF5' }}
          >
            <ApperIcon 
              name={category.icon || 'Folder'} 
              size={16} 
              className="text-white" 
            />
          </div>
          
          <span className="font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors duration-200">
            {category.name}
          </span>
        </div>
        
        {count > 0 && (
          <span className="bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-full text-xs font-semibold">
            {count}
          </span>
        )}
      </motion.div>
    </NavLink>
  )
}

export default CategoryItem