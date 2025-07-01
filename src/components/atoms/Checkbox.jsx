import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  className = '',
  size = 'md'
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <label className={`flex items-center cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        
        <motion.div
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          className={`${sizes[size]} border-2 rounded transition-all duration-200 flex items-center justify-center ${
            checked 
              ? 'bg-gradient-to-br from-primary-500 to-primary-600 border-primary-500' 
              : 'bg-white border-neutral-300 hover:border-primary-300'
          }`}
        >
{checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <ApperIcon name="Check" size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} className="text-white" />
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {label && (
        <span className="ml-3 text-sm text-neutral-700 select-none">
          {label}
        </span>
      )}
    </label>
  )
}

export default Checkbox