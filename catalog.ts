// Request catalog, statuses, and field rules shared by the browser and the server.
// Ported from the original SERVEE portal so both sides validate the same way.

export const CATEGORIES: { category: string; options: string[] }[] = [
  {
    category: 'Application Login / Account Management',
    options: [
      'Request Active Directory Account Creation',
      'Request Active Directory Account Deletion',
      'Request Active Directory Password Reset',
    ],
  },
  {
    category: 'Communication',
    options: [
      'Request Mobile Phone',
      'Request Mobile Plan',
      'Request Mobile Load Allowance',
      'Request IP Phone',
      'Request Assistance on Teams & Microsoft 365',
    ],
  },
  {
    category: 'Email',
    options: [
      'Request Email Account Creation',
      'Request Email Account Deletion',
      'Request Email Password Reset',
      'Request Additional SharePoint Storage',
      'Request Removal of a Member from an Existing Group Email List',
    ],
  },
  {
    category: 'Hardware',
    options: ['Request New Laptop/Desktop', 'Request Laptop Repair', 'Request Transfer of Laptop', 'Return of Laptop'],
  },
  {
    category: 'Internet / Network',
    options: [
      'Request Wi-Fi Access',
      'Request Application Access → Messaging App',
      'Request Application Access → Training App',
      'Request Application Access → Recruitment App',
      'Request Application Access → Travel App',
      'Request Application Access → Streaming App',
      'Request Printer Access',
    ],
  },
  {
    category: 'Software',
    options: ['Request Software Installation', 'Request Software Uninstallation', 'Request Installation of Printer Drivers'],
  },
  { category: 'User Management', options: ['New Hire'] },
  { category: 'TCD', options: ['Request TCD Registration', 'Request TCD User Deletion'] },
  {
    category: 'Information Security',
    options: [
      'Whitelisting of Flash Drive',
      'IOC for Blocking – Firewall',
      'IOC for Blocking – Trend Micro AV',
      'IOC for Blocking – Email Security',
    ],
  },
  {
    category: 'SAP',
    options: [
      'Reset SAP Password',
      'Creation of SAP Access',
      'Deactivation of SAP Access',
      'Creation of UARF',
      'SAP QAS Transport',
      'SAP PRD Transport',
    ],
  },
  { category: 'Others', options: ['Other ICT Request / Inquiry'] },
]

export const OTHER_REQUEST = 'Other ICT Request / Inquiry'
export const EMAIL_CREATION = 'Request Email Account Creation'
export const SAP_CREATION = 'Creation of SAP Access'

export const APPROVAL_REQUIRED = [
  'Request Application Access → Messaging App',
  'Request Application Access → Training App',
  'Request Application Access → Recruitment App',
  'Request Application Access → Travel App',
  'Request Application Access → Streaming App',
  'Request New Laptop/Desktop',
  'Request Transfer of Laptop',
  'Return of Laptop',
  'Whitelisting of Flash Drive',
  'Request Email Account Creation',
  'Request Email Account Deletion',
  'Creation of SAP Access',
  'Request Mobile Phone',
  'Request Mobile Plan',
  'Request Mobile Load Allowance',
]

export const APP_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Messaging App': 'Includes tools like Messenger, WeChat, WhatsApp, Viber, etc.',
  'Training App':
    'Used for educational learning, professional development, skill-building, or technical training.',
  'Recruitment App':
    'Sites that support the seeking of employment or employees, including career agents and job postings.',
  'Travel App':
    'Accommodations, transportation (rail, airlines, cruise ships), agencies, resorts, tourist attractions, advisories, etc.',
  'Streaming App': 'Educational content from formal lectures and tutorials to self-paced learning and skill development.',
}

export type DetailField = {
  key: string
  label: string
  placeholder: string
  type?: 'text' | 'tel' | 'select'
  options?: string[]
}

export const EMPLOYEE_FIELDS: DetailField[] = [
  { key: 'fullName', label: 'Full name', placeholder: 'e.g. Juan C. Dela Cruz Jr.' },
  { key: 'pernr', label: 'PERNR (Employee No.)', placeholder: 'e.g. 10023491' },
  { key: 'jobTitle', label: 'Position / Job title', placeholder: 'e.g. Systems Analyst' },
  { key: 'contactNo', label: 'Contact number', placeholder: 'e.g. 09171234567', type: 'tel' },
  {
    key: 'empStatus',
    label: 'Employee status',
    placeholder: 'Select status',
    type: 'select',
    options: ['Regular / Permanent', 'Probationary', 'Project Hire', 'Fixed Term / Contractual'],
  },
  { key: 'managerName', label: 'Immediate supervisor', placeholder: 'e.g. Maria Santos' },
]

export const ORG_FIELDS: DetailField[] = [
  { key: 'orgUnit', label: 'Organization unit', placeholder: 'e.g. ICT - Operations' },
  { key: 'businessUnit', label: 'Business unit / Project', placeholder: 'e.g. Shared Services' },
  { key: 'subarea', label: 'Subarea / Work location', placeholder: 'e.g. HO-Renaissance' },
  { key: 'costCenter', label: 'Cost center', placeholder: 'e.g. MIEG130' },
]

export const ALL_DETAIL_FIELDS = [...EMPLOYEE_FIELDS, ...ORG_FIELDS]

/** Which detail fields a request type requires. */
export function requiredDetailKeys(requestType: string): string[] {
  if (requestType === SAP_CREATION) return ['fullName', 'pernr', 'jobTitle']
  if (requestType === EMAIL_CREATION) return ALL_DETAIL_FIELDS.map((f) => f.key)
  return []
}

export function isAppAccess(requestType: string) {
  return requestType.startsWith('Request Application Access')
}

export function appAccessKind(requestType: string) {
  return requestType.split('→')[1]?.trim() ?? ''
}

export function categoryFor(requestType: string) {
  return CATEGORIES.find((c) => c.options.includes(requestType))?.category ?? null
}

export const STATUSES = [
  'Pending Approval',
  'Approved & Queued',
  'In Progress',
  'Resolved',
  'Closed',
  'Rejected',
  'Re-Opened',
] as const

export type TicketStatus = (typeof STATUSES)[number]

export const STATUS_STYLES: Record<string, string> = {
  'Pending Approval': 'bg-amber-100 text-amber-800 ring-amber-300/60 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/30',
  'Approved & Queued': 'bg-orange-100 text-orange-800 ring-orange-300/60 dark:bg-orange-400/10 dark:text-orange-300 dark:ring-orange-400/30',
  'In Progress': 'bg-sky-100 text-sky-800 ring-sky-300/60 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/30',
  Resolved: 'bg-violet-100 text-violet-800 ring-violet-300/60 dark:bg-violet-400/10 dark:text-violet-300 dark:ring-violet-400/30',
  Closed: 'bg-emerald-100 text-emerald-800 ring-emerald-300/60 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/30',
  Rejected: 'bg-rose-100 text-rose-800 ring-rose-300/60 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/30',
  'Re-Opened': 'bg-fuchsia-100 text-fuchsia-800 ring-fuchsia-300/60 dark:bg-fuchsia-400/10 dark:text-fuchsia-300 dark:ring-fuchsia-400/30',
}

/** Human-friendly ticket reference, e.g. ICT-2026-00042. */
export function ticketRef(id: number, createdAt: string | Date) {
  const year = new Date(createdAt).getFullYear()
  return `ICT-${year}-${String(id).padStart(5, '0')}`
}

export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024
