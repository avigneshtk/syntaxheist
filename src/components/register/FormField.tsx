
'use client'

// ─────────────────────────────────────────────────────────────────────────────
// FormField — Reusable Accessible Input Primitive for SyntaxHeist Forms
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  id: string
  label: string
  required?: boolean
  error?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export default function FormField({
  id,
  label,
  required = false,
  error,
  description,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs font-mono tracking-wider uppercase text-white/90 flex items-center gap-1"
        >
          {label}
          {required && (
            <span className="text-primary" aria-hidden="true">
              *
            </span>
          )}
        </label>

        {required && (
          <span className="text-[10px] font-mono text-muted/60 uppercase">
            Required
          </span>
        )}
      </div>

      {description && (
        <p id={`${id}-desc`} className="text-xs text-muted leading-relaxed">
          {description}
        </p>
      )}

      {children}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs font-mono text-[#ff5f56] flex items-center gap-1.5 animate-fadeIn"
        >
          <AlertCircle size={13} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
