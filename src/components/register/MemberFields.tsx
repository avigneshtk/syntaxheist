
'use client'

// ─────────────────────────────────────────────────────────────────────────────
// MemberFields — Dynamic Additional Team Members Manager
// Stable UI IDs are managed by the parent RegistrationForm.
// Enforces: members.length === teamSize - 1
// ─────────────────────────────────────────────────────────────────────────────

import { AlertCircle, Trash2, UserPlus } from 'lucide-react'
import type { TeamMember } from '@/lib/types'
import { REGISTRATION_CONFIG } from '@/lib/registration-config'
import { cn } from '@/lib/utils'

interface MemberFieldsProps {
  members: TeamMember[]
  memberIds: string[]
  onAddMember: () => void
  onRemoveMember: (index: number) => void
  onMemberChange: (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => void
  fieldErrors?: Record<string, string[]>
  announcement?: string
}

export default function MemberFields({
  members,
  memberIds,
  onAddMember,
  onRemoveMember,
  onMemberChange,
  fieldErrors = {},
  announcement = '',
}: MemberFieldsProps) {
  const maxAdditionalMembers = Math.max(
    0,
    REGISTRATION_CONFIG.technicalMaxTeamSize - 1
  )

  const canAddMember =
    members.length < maxAdditionalMembers &&
    memberIds.length === members.length

  return (
    <div className="flex flex-col gap-4">
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      <div className="flex items-center justify-between border-b border-primary/10 pb-2">
        <div>
          <h3 className="text-xs font-mono tracking-widest uppercase text-white font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Additional Team Members ({members.length})
          </h3>

          <p className="text-[11px] text-muted">
            Team Leader is Member 01. Additional members correspond to remaining team members.
          </p>

          <p className="text-[10px] text-muted/70 mt-1">
            Preview input limit: {maxAdditionalMembers} additional members.
            This is a technical limit, not an official event team-size rule.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddMember}
          disabled={!canAddMember}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider',
            'border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-[#080b08]',
            'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary',
            'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary/10 disabled:hover:text-primary'
          )}
        >
          <UserPlus size={13} aria-hidden="true" />
          Add Member
        </button>
      </div>

      {members.length === 0 ? (
        <div className="p-4 rounded-sm border border-dashed border-white/10 bg-[#090e09]/50 text-center">
          <p className="text-xs text-muted font-mono">
            Solo participant? Total team size is 1. If competing with teammates, click &ldquo;Add Member&rdquo; above.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {members.map((member, index) => {
            const memberNumber = index + 2
            const memberId = memberIds[index] ?? `pending-member-${index}`

            const nameErr = fieldErrors[`members.${index}.name`]?.[0]
            const emailErr = fieldErrors[`members.${index}.email`]?.[0]
            const collegeErr = fieldErrors[`members.${index}.college`]?.[0]

            const nameId = `${memberId}-name`
            const emailId = `${memberId}-email`
            const collegeId = `${memberId}-college`

            return (
              <div
                key={memberId}
                className="group relative p-4 rounded-sm border border-white/10 bg-[#090e09] flex flex-col gap-3 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[11px] font-mono tracking-wider text-primary font-bold uppercase">
                    Member {String(memberNumber).padStart(2, '0')}
                  </span>

                  <button
                    type="button"
                    onClick={() => onRemoveMember(index)}
                    aria-label={`Remove Member ${memberNumber}`}
                    className="text-muted hover:text-[#ff5f56] p-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff5f56]"
                  >
                    <Trash2 size={14} aria-hidden="true" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor={nameId} className="text-[11px] font-mono uppercase text-muted tracking-wide">
                      Full Name *
                    </label>

                    <input
                      id={nameId}
                      type="text"
                      required
                      value={member.name}
                      onChange={(e) => onMemberChange(index, 'name', e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      aria-invalid={Boolean(nameErr)}
                      aria-describedby={nameErr ? `${nameId}-error` : undefined}
                      className={cn(
                        'w-full px-3 py-2 rounded-sm text-xs font-mono bg-surface border text-white placeholder:text-muted/40',
                        'focus:outline-none focus:ring-1 focus:ring-primary',
                        nameErr ? 'border-[#ff5f56]' : 'border-white/15'
                      )}
                    />

                    {nameErr && (
                      <p id={`${nameId}-error`} className="flex items-center gap-1 text-[10px] font-mono text-[#ff5f56]">
                        <AlertCircle size={11} aria-hidden="true" />
                        {nameErr}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor={emailId} className="text-[11px] font-mono uppercase text-muted tracking-wide">
                      Email Address *
                    </label>

                    <input
                      id={emailId}
                      type="email"
                      required
                      value={member.email}
                      onChange={(e) => onMemberChange(index, 'email', e.target.value)}
                      placeholder="e.g. alex@institution.edu"
                      aria-invalid={Boolean(emailErr)}
                      aria-describedby={emailErr ? `${emailId}-error` : undefined}
                      className={cn(
                        'w-full px-3 py-2 rounded-sm text-xs font-mono bg-surface border text-white placeholder:text-muted/40',
                        'focus:outline-none focus:ring-1 focus:ring-primary',
                        emailErr ? 'border-[#ff5f56]' : 'border-white/15'
                      )}
                    />

                    {emailErr && (
                      <p id={`${emailId}-error`} className="flex items-center gap-1 text-[10px] font-mono text-[#ff5f56]">
                        <AlertCircle size={11} aria-hidden="true" />
                        {emailErr}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor={collegeId} className="text-[11px] font-mono uppercase text-muted tracking-wide">
                      College / Institution *
                    </label>

                    <input
                      id={collegeId}
                      type="text"
                      required
                      value={member.college}
                      onChange={(e) => onMemberChange(index, 'college', e.target.value)}
                      placeholder="e.g. FISAT Angamaly"
                      aria-invalid={Boolean(collegeErr)}
                      aria-describedby={collegeErr ? `${collegeId}-error` : undefined}
                      className={cn(
                        'w-full px-3 py-2 rounded-sm text-xs font-mono bg-surface border text-white placeholder:text-muted/40',
                        'focus:outline-none focus:ring-1 focus:ring-primary',
                        collegeErr ? 'border-[#ff5f56]' : 'border-white/15'
                      )}
                    />

                    {collegeErr && (
                      <p id={`${collegeId}-error`} className="flex items-center gap-1 text-[10px] font-mono text-[#ff5f56]">
                        <AlertCircle size={11} aria-hidden="true" />
                        {collegeErr}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
