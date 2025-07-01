import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  icon,
  pulse = false,
  className = ''
}) => {
  const variants = {
    default: 'bg-neutral-100 text-neutral-700',
    primary: 'bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800',
    secondary: 'bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-800',
    success: 'bg-gradient-to-r from-success-100 to-success-200 text-success-800',
    warning: 'bg-gradient-to-r from-warning-100 to-warning-200 text-warning-800',
    error: 'bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800',
    high: 'bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800',
    medium: 'bg-gradient-to-r from-warning-100 to-warning-200 text-warning-800',
    low: 'bg-gradient-to-r from-success-100 to-success-200 text-success-800'
  }

  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  return (
    <span className={`inline-flex items-center gap-1 font-medium rounded-full ${variants[variant]} ${sizes[size]} ${pulse ? 'priority-pulse' : ''} ${className}`}>
      {icon && <ApperIcon name={icon} size={12} />}
      {children}
    </span>
  )
}

export default Badge