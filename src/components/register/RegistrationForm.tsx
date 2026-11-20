
'use client'

// RegistrationForm — Interactive preview form.
// Owns form state, stable member IDs, validation, and submission.

import {
  useCallback,
  useId,
  useRef,
  useState,
  useTransition,
} from 'react'
import { ArrowRight, Loader2, Info, ExternalLink } from 'lucide-react'
import FormField from './FormField'
import TrackSelector from './TrackSelector'
import MemberFields from './MemberFields'
import TermsModal from './TermsModal'
import { registrationSchema } from '@/lib/validation'
import { REGISTRATION_CONFIG } from '@/lib/registration-config'
import type {
  RegistrationFormData,
  RegistrationActionResponse,
  TeamMember,
} from '@/lib/types'
import { cn } from '@/lib/utils'

interface RegistrationFormProps {
  onSubmitAction: (
    data: RegistrationFormData
  ) => Promise<RegistrationActionResponse>
  onSuccess: (result: RegistrationActionResponse) => void
}

const EMPTY_MEMBER: TeamMember = {
  name: '',
  email: '',
  college: '',
}

export default function RegistrationForm({
  onSubmitAction,
  onSuccess,
}: RegistrationFormProps) {
  const [isPending, startTransition] = useTransition()
  const [termsModalOpen, setTermsModalOpen] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  const memberIdPrefix = useId()
  const nextMemberId = useRef(0)

  const [formData, setFormData] = useState<RegistrationFormData>({
    teamName: '',
    teamSize: 1,
    trackId: 'ai-ml',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    leaderCollege: '',
    members: [],
    agreedToTerms: false,
    honeypot: '',
  })

  const [memberIds, setMemberIds] = useState<string[]>([])
  const [teamSizeInput, setTeamSizeInput] = useState('1')

  // Stable modal close handler.
  const closeTermsModal = useCallback(() => {
    setTermsModalOpen(false)
  }, [])

  const createMemberId = () => {
    nextMemberId.current += 1
    return `${memberIdPrefix}-member-${nextMemberId.current}`
  }

  // Keep member data and its stable UI IDs synchronized.
  const handleTeamSizeChange = (newSize: number) => {
    const technicalMax = REGISTRATION_CONFIG.technicalMaxTeamSize

    const size = Math.min(
      technicalMax,
      Math.max(
        REGISTRATION_CONFIG.minTeamSize,
        Math.trunc(newSize)
      )
    )

    const neededMembers = size - 1

    const updatedMembers = [...formData.members].slice(0, neededMembers)
    const updatedIds = [...memberIds].slice(0, neededMembers)

    while (updatedMembers.length < neededMembers) {
      updatedMembers.push({ ...EMPTY_MEMBER })
      updatedIds.push(createMemberId())
    }

    setTeamSizeInput(String(size))
    setMemberIds(updatedIds)

    setFormData((prev) => ({
      ...prev,
      teamSize: size,
      members: updatedMembers,
    }))
  }

  const handleAddMember = () => {
    const technicalMax = REGISTRATION_CONFIG.technicalMaxTeamSize

    if (
      formData.members.length >= technicalMax - 1 ||
      memberIds.length !== formData.members.length
    ) {
      return
    }

    const newId = createMemberId()
    const teamSize = formData.members.length + 2

    setMemberIds((prev) => [...prev, newId])
    setTeamSizeInput(String(teamSize))

    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, { ...EMPTY_MEMBER }],
      teamSize,
    }))
  }

  const handleRemoveMember = (index: number) => {
    if (index < 0 || index >= formData.members.length) return

    const updatedMembers = formData.members.filter(
      (_, i) => i !== index
    )

    const updatedIds = memberIds.filter(
      (_, i) => i !== index
    )

    const teamSize = updatedMembers.length + 1

    setMemberIds(updatedIds)
    setTeamSizeInput(String(teamSize))

    setFormData((prev) => ({
      ...prev,
      members: updatedMembers,
      teamSize,
    }))
  }

  const handleMemberChange = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.map((member, i) =>
        i === index
          ? { ...member, [field]: value }
          : member
      ),
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSubmitError(null)
    setFieldErrors({})

    const validation = registrationSchema.safeParse(formData)

    if (!validation.success) {
      const errors: Record<string, string[]> = {}

      for (const issue of validation.error.issues) {
        const path = issue.path.join('.') || 'general'

        errors[path] ??= []
        errors[path].push(issue.message)
      }

      setFieldErrors(errors)
      setSubmitError(
        'Please address the highlighted errors before submitting.'
      )

      return
    }

    startTransition(async () => {
      try {
        const response = await onSubmitAction(
          validation.data as RegistrationFormData
        )

        if (response.success) {
          onSuccess(response)
        } else {
          setSubmitError(response.error)

          if (response.fieldErrors) {
            setFieldErrors(response.fieldErrors)
          }
        }
      } catch {
        setSubmitError(
          'The request could not be completed. Please verify your connection and try again.'
        )
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex w-full max-w-3xl flex-col gap-8"
      aria-label="SyntaxHeist Registration Preview Form"
    >
      {/* Status notice */}
      <div className="flex items-start gap-3 rounded-sm border border-primary/25 bg-primary/[0.05] p-4">
        <Info
          className="mt-0.5 shrink-0 text-primary"
          size={18}
          aria-hidden="true"
        />

        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold uppercase tracking-wider text-white">
              {REGISTRATION_CONFIG.notice.title}
            </span>

            <span className="rounded bg-primary/20 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-primary">
              {REGISTRATION_CONFIG.notice.badge}
            </span>
          </div>

          <p className="leading-relaxed text-muted">
            {REGISTRATION_CONFIG.notice.description}
          </p>
        </div>
      </div>

      {/* Global error */}
      {submitError && (
        <div
          role="alert"
          className="flex animate-fadeIn items-center gap-2 rounded-sm border border-[#ff5f56]/40 bg-[#ff5f56]/10 p-4 font-mono text-xs text-[#ff5f56]"
        >
          <span aria-hidden="true">⚠</span>
          <span>{submitError}</span>
        </div>
      )}

      {/* 01. Team and track */}
      <fieldset className="flex flex-col gap-5 rounded-sm border border-primary/15 bg-surface/50 p-5 sm:p-6">
        <legend className="flex items-center gap-2 px-2 font-mono text-xs font-bold uppercase tracking-widest text-primary">
          <span>01</span>
          <span>Team &amp; Track Specification</span>
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            id="teamName"
            label="Team Name"
            required
            error={fieldErrors.teamName?.[0]}
            description="Distinctive team or handle name (2–60 chars)"
          >
            <input
              id="teamName"
              type="text"
              required
              value={formData.teamName}
              aria-invalid={Boolean(fieldErrors.teamName?.length)}
              aria-describedby={[
                'teamName-desc',
                fieldErrors.teamName?.length ? 'teamName-error' : null,
              ].filter(Boolean).join(' ')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  teamName: e.target.value,
                }))
              }
              placeholder="e.g. NullPointerProtocol"
              className={cn(
                'w-full rounded-sm border bg-[#090e09] px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-muted/40',
                'focus:outline-none focus:ring-1 focus:ring-primary',
                fieldErrors.teamName ? 'border-[#ff5f56]' : 'border-white/15'
              )}
            />
          </FormField>

          <FormField
            id="teamSize"
            label="Total Team Size"
            required
            error={fieldErrors.teamSize?.[0]}
            description={`Total members including team leader. Preview technical ceiling: ${REGISTRATION_CONFIG.technicalMaxTeamSize}; official team-size policy is to be confirmed.`}
          >
            <div className="flex items-center gap-2">
              <input
                id="teamSize"
                type="number"
                required
                min={REGISTRATION_CONFIG.minTeamSize}
                max={REGISTRATION_CONFIG.technicalMaxTeamSize}
                step={1}
                inputMode="numeric"
                value={teamSizeInput}
                aria-invalid={Boolean(fieldErrors.teamSize?.length)}
                aria-describedby={[
                  'teamSize-desc',
                  fieldErrors.teamSize?.length ? 'teamSize-error' : null,
                ].filter(Boolean).join(' ')}
                onChange={(e) => {
                  const rawValue = e.target.value
                  setTeamSizeInput(rawValue)

                  if (rawValue === '') return

                  const parsed = Number(rawValue)

                  if (!Number.isFinite(parsed)) return

                  handleTeamSizeChange(parsed)
                }}
                onBlur={() => {
                  if (teamSizeInput === '') {
                    setTeamSizeInput(String(formData.teamSize))
                  }
                }}
                className={cn(
                  'w-full rounded-sm border bg-[#090e09] px-3.5 py-2.5 font-mono text-xs text-white',
                  'focus:outline-none focus:ring-1 focus:ring-primary',
                  fieldErrors.teamSize ? 'border-[#ff5f56]' : 'border-white/15'
                )}
              />

              <span className="whitespace-nowrap font-mono text-xs text-muted">
                {formData.teamSize === 1 ? 'Solo Hacker' : 'Team Members'}
              </span>
            </div>
          </FormField>
        </div>

        <TrackSelector
          selectedTrackId={formData.trackId}
          onChange={(trackId) =>
            setFormData((prev) => ({
              ...prev,
              trackId,
            }))
          }
          error={fieldErrors.trackId?.[0]}
        />
      </fieldset>

      {/* 02. Team leader */}
      <fieldset className="flex flex-col gap-5 rounded-sm border border-primary/15 bg-surface/50 p-5 sm:p-6">
        <legend className="flex items-center gap-2 px-2 font-mono text-xs font-bold uppercase tracking-widest text-primary">
          <span>02</span>
          <span>Team Leader / Primary Contact</span>
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            id="leaderName"
            label="Leader Full Name"
            required
            error={fieldErrors.leaderName?.[0]}
          >
            <input
              id="leaderName"
              type="text"
              required
              value={formData.leaderName}
              aria-invalid={Boolean(fieldErrors.leaderName?.length)}
              aria-describedby={
                fieldErrors.leaderName?.length
                  ? 'leaderName-error'
                  : undefined
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  leaderName: e.target.value,
                }))
              }
              placeholder="e.g. Maya Chen"
              className={cn(
                'w-full rounded-sm border bg-[#090e09] px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-muted/40',
                'focus:outline-none focus:ring-1 focus:ring-primary',
                fieldErrors.leaderName ? 'border-[#ff5f56]' : 'border-white/15'
              )}
            />
          </FormField>

          <FormField
            id="leaderEmail"
            label="Leader Email Address"
            required
            error={fieldErrors.leaderEmail?.[0]}
            description="Used for event correspondence if registration opens"
          >
            <input
              id="leaderEmail"
              type="email"
              required
              value={formData.leaderEmail}
              aria-invalid={Boolean(fieldErrors.leaderEmail?.length)}
              aria-describedby={[
                'leaderEmail-desc',
                fieldErrors.leaderEmail?.length ? 'leaderEmail-error' : null,
              ].filter(Boolean).join(' ')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  leaderEmail: e.target.value,
                }))
              }
              placeholder="e.g. maya@institution.edu"
              className={cn(
                'w-full rounded-sm border bg-[#090e09] px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-muted/40',
                'focus:outline-none focus:ring-1 focus:ring-primary',
                fieldErrors.leaderEmail ? 'border-[#ff5f56]' : 'border-white/15'
              )}
            />
          </FormField>

          <FormField
            id="leaderPhone"
            label="Leader Mobile (WhatsApp)"
            required
            error={fieldErrors.leaderPhone?.[0]}
            description="10-digit Indian number (+91 optional)"
          >
            <input
              id="leaderPhone"
              type="tel"
              required
              value={formData.leaderPhone}
              aria-invalid={Boolean(fieldErrors.leaderPhone?.length)}
              aria-describedby={[
                'leaderPhone-desc',
                fieldErrors.leaderPhone?.length ? 'leaderPhone-error' : null,
              ].filter(Boolean).join(' ')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  leaderPhone: e.target.value,
                }))
              }
              placeholder="e.g. 9876543210 or +91 9876543210"
              className={cn(
                'w-full rounded-sm border bg-[#090e09] px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-muted/40',
                'focus:outline-none focus:ring-1 focus:ring-primary',
                fieldErrors.leaderPhone ? 'border-[#ff5f56]' : 'border-white/15'
              )}
            />
          </FormField>

          <FormField
            id="leaderCollege"
            label="College / Institution"
            required
            error={fieldErrors.leaderCollege?.[0]}
            description="Official college or university name"
          >
            <input
              id="leaderCollege"
              type="text"
              required
              value={formData.leaderCollege}
              aria-invalid={Boolean(fieldErrors.leaderCollege?.length)}
              aria-describedby={[
                'leaderCollege-desc',
                fieldErrors.leaderCollege?.length ? 'leaderCollege-error' : null,
              ].filter(Boolean).join(' ')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  leaderCollege: e.target.value,
                }))
              }
              placeholder="e.g. FISAT, Angamaly"
              className={cn(
                'w-full rounded-sm border bg-[#090e09] px-3.5 py-2.5 font-mono text-xs text-white placeholder:text-muted/40',
                'focus:outline-none focus:ring-1 focus:ring-primary',
                fieldErrors.leaderCollege ? 'border-[#ff5f56]' : 'border-white/15'
              )}
            />
          </FormField>
        </div>
      </fieldset>

      {/* 03. Additional members */}
      <fieldset className="flex flex-col gap-4 rounded-sm border border-primary/15 bg-surface/50 p-5 sm:p-6">
        <legend className="flex items-center gap-2 px-2 font-mono text-xs font-bold uppercase tracking-widest text-primary">
          <span>03</span>
          <span>Additional Team Members</span>
        </legend>

        <MemberFields
          members={formData.members}
          memberIds={memberIds}
          onAddMember={handleAddMember}
          onRemoveMember={handleRemoveMember}
          onMemberChange={handleMemberChange}
          fieldErrors={fieldErrors}
        />
      </fieldset>

      {/* 04. Preview acknowledgement */}
      <fieldset className="flex flex-col gap-4 rounded-sm border border-primary/15 bg-surface/50 p-5 sm:p-6">
        <legend className="flex items-center gap-2 px-2 font-mono text-xs font-bold uppercase tracking-widest text-primary">
          <span>04</span>
          <span>Preview Acknowledgement</span>
        </legend>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="agreedToTerms"
            className="group flex cursor-pointer items-start gap-3"
          >
            <input
              id="agreedToTerms"
              type="checkbox"
              checked={formData.agreedToTerms}
              aria-invalid={Boolean(fieldErrors.agreedToTerms?.length)}
              aria-describedby={
                fieldErrors.agreedToTerms?.length
                  ? 'agreedToTerms-error'
                  : undefined
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  agreedToTerms: e.target.checked,
                }))
              }
              className="mt-1 h-4 w-4 rounded-sm border-white/20 bg-[#090e09] text-primary focus:ring-primary focus:ring-offset-0 focus:ring-offset-base"
            />

            <span className="text-xs leading-relaxed text-muted">
              I understand this is a registration preview only. Submissions are
              currently disabled; no registration is accepted or stored through
              this form. Final event details and guidelines will be published
              by the organizer.
            </span>
          </label>

          <button
            type="button"
            onClick={() => setTermsModalOpen(true)}
            className="ml-7 inline-flex w-fit items-center gap-1 font-mono text-xs text-primary underline hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            View provisional event notes
            <ExternalLink size={11} aria-hidden="true" />
          </button>

          {fieldErrors.agreedToTerms && (
            <p
              id="agreedToTerms-error"
              role="alert"
              className="flex items-center gap-1.5 pt-1 font-mono text-xs text-[#ff5f56]"
            >
              <span aria-hidden="true">⚠</span>
              {fieldErrors.agreedToTerms[0]}
            </p>
          )}
        </div>
      </fieldset>

      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={REGISTRATION_CONFIG.honeypotField}>
          Leave this field blank
        </label>

        <input
          id={REGISTRATION_CONFIG.honeypotField}
          type="text"
          name={REGISTRATION_CONFIG.honeypotField}
          value={formData.honeypot}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              honeypot: e.target.value,
            }))
          }
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-primary/10 pt-2 sm:flex-row">
        <div className="text-center font-mono text-[11px] text-muted/70 sm:text-left">
          SyntaxHeist 2027 · IEEE FISAT Student Branch
          <br className="hidden sm:block" />
          Federal Institute of Science and Technology, Angamaly
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={cn(
            'inline-flex w-full items-center justify-center gap-3 rounded-sm bg-primary px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-[#080b08] shadow-[0_0_24px_rgba(114,255,117,0.4)] transition-all duration-200 hover:bg-white sm:w-auto sm:text-sm',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base',
            isPending && 'pointer-events-none cursor-not-allowed opacity-60'
          )}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Processing Preview...
            </>
          ) : (
            <>
              Initiate Entry Protocol
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>

      {/* Provisional guidelines modal */}
      <TermsModal
        isOpen={termsModalOpen}
        onClose={closeTermsModal}
      />
    </form>
  )
}
