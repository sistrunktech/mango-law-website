import {
  FileText,
  Mail,
  MapPin,
  LogIn,
  Edit2,
  Plus,
  Trash2,
  Eye,
  Save,
  Filter,
  Search,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function AdminGuidePage() {
  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Mango Law CMS Admin Guide</h1>
            <p className="text-amber-100">Complete guide to managing your website content</p>
          </div>

          <div className="p-8 space-y-12">

            <Section
              icon={<LogIn className="w-6 h-6" />}
              title="Getting Started"
              id="getting-started"
            >
              <p className="text-slate-300 mb-4">
                To access the admin dashboard, navigate to <code className="px-2 py-1 bg-slate-700 rounded text-amber-400">/admin/login</code> and sign in with your credentials.
              </p>

              <StepBox
                number={1}
                title="Navigate to Login Page"
                description="Go to yourdomain.com/admin/login"
              />
              <StepBox
                number={2}
                title="Enter Credentials"
                description="Use your authorized email and password"
              />
              <StepBox
                number={3}
                title="Access Dashboard"
                description="You'll be redirected to the admin dashboard"
              />

              <InfoBox type="info">
                If you don't have login credentials, contact your system administrator to set up your account.
              </InfoBox>
            </Section>

            <Section
              icon={<FileText className="w-6 h-6" />}
              title="Managing Blog Posts"
              id="blog-posts"
            >
              <p className="text-slate-300 mb-6">
                The Blog Manager allows you to create, edit, and publish blog posts for your website.
              </p>

              <SubSection title="Creating a New Post">
                <ol className="list-decimal list-inside space-y-3 text-slate-300">
                  <li>Click the <IconButton icon={<Plus />} label="New Post" /> button</li>
                  <li>Fill in the required fields:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-slate-400">
                      <li><strong className="text-slate-300">Title:</strong> The main headline of your post</li>
                      <li><strong className="text-slate-300">Slug:</strong> URL-friendly version (auto-generated from title)</li>
                      <li><strong className="text-slate-300">Excerpt:</strong> Brief 1-2 sentence summary</li>
                      <li><strong className="text-slate-300">Content:</strong> Full post content (supports Markdown)</li>
                      <li><strong className="text-slate-300">Category:</strong> Organize by topic (e.g., "Criminal Defense")</li>
                      <li><strong className="text-slate-300">Tags:</strong> Comma-separated keywords</li>
                    </ul>
                  </li>
                  <li>Check "Published" to make it live, or leave unchecked to save as draft</li>
                  <li>Click <IconButton icon={<Save />} label="Save Post" /> to save</li>
                </ol>
              </SubSection>

              <SubSection title="Editing Existing Posts">
                <p className="text-slate-300 mb-3">
                  To edit a post, click the <IconButton icon={<Edit2 />} label="Edit" color="blue" /> button next to any post in the list.
                </p>
              </SubSection>

              <SubSection title="Publishing & Unpublishing">
                <p className="text-slate-300 mb-3">
                  Use the <IconButton icon={<Eye />} label="" color="slate" /> button to quickly toggle between published and draft status.
                </p>
                <InfoBox type="success">
                  Published posts appear immediately on your public website at /blog
                </InfoBox>
              </SubSection>

              <SubSection title="Deleting Posts">
                <p className="text-slate-300 mb-3">
                  Click the <IconButton icon={<Trash2 />} label="" color="red" /> button to delete a post. You'll be asked to confirm.
                </p>
                <InfoBox type="warning">
                  Deleted posts cannot be recovered. Make sure you have a backup if needed.
                </InfoBox>
              </SubSection>
            </Section>

            <Section
              icon={<Mail className="w-6 h-6" />}
              title="Managing Contact Leads"
              id="contact-leads"
            >
              <p className="text-slate-300 mb-6">
                The Contact Manager helps you track and respond to inquiries from potential clients.
              </p>

              <SubSection title="Viewing Leads">
                <p className="text-slate-300 mb-4">
                  All contact form submissions appear in the Contact Leads tab. Each lead shows:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                  <li>Name and contact information</li>
                  <li>Message content</li>
                  <li>Case type (if provided)</li>
                  <li>Submission date</li>
                  <li>Current status</li>
                </ul>
              </SubSection>

              <SubSection title="Lead Statuses">
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  <StatusBadge status="new" label="New" description="Unread submission" />
                  <StatusBadge status="contacted" label="Contacted" description="Initial contact made" />
                  <StatusBadge status="qualified" label="Qualified" description="Potential client qualified" />
                  <StatusBadge status="closed" label="Closed" description="No longer active" />
                </div>
              </SubSection>

              <SubSection title="Managing a Lead">
                <ol className="list-decimal list-inside space-y-3 text-slate-300">
                  <li>Click on any lead to view full details</li>
                  <li>Update the status dropdown to track progress</li>
                  <li>Add internal notes in the notes field (private, not visible to client)</li>
                  <li>Click email or phone to quickly contact the lead</li>
                </ol>
              </SubSection>

              <SubSection title="Filtering Leads">
                <p className="text-slate-300 mb-3">
                  Use the dropdown filter to view leads by status (All, New, Contacted, Qualified, Closed).
                </p>
              </SubSection>
            </Section>

            <Section
              icon={<MapPin className="w-6 h-6" />}
              title="Managing DUI Checkpoints"
              id="checkpoints"
            >
              <p className="text-slate-300 mb-6">
                Track and display DUI checkpoint locations and schedules across Ohio.
              </p>

              <SubSection title="Adding a Checkpoint">
                <ol className="list-decimal list-inside space-y-3 text-slate-300">
                  <li>Click <IconButton icon={<Plus />} label="New Checkpoint" /></li>
                  <li>Fill in the checkpoint details:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-slate-400">
                      <li><strong className="text-slate-300">Title:</strong> Brief name (e.g., "I-71 Northbound Checkpoint")</li>
                      <li><strong className="text-slate-300">Location Address:</strong> Specific intersection or mile marker</li>
                      <li><strong className="text-slate-300">City & County:</strong> Location details</li>
                      <li><strong className="text-slate-300">Coordinates:</strong> Latitude and longitude for map display</li>
                      <li><strong className="text-slate-300">Start/End Date:</strong> Checkpoint schedule</li>
                      <li><strong className="text-slate-300">Status:</strong> Upcoming, Active, Completed, or Cancelled</li>
                      <li><strong className="text-slate-300">Source:</strong> Information source (e.g., "Columbus PD")</li>
                    </ul>
                  </li>
                  <li>Check "Verified" if confirmed by official source</li>
                  <li>Click Save Checkpoint</li>
                </ol>
              </SubSection>

              <SubSection title="Checkpoint Statuses">
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  <StatusBadge status="upcoming" label="Upcoming" description="Scheduled for future date" />
                  <StatusBadge status="active" label="Active" description="Currently happening" />
                  <StatusBadge status="completed" label="Completed" description="Past checkpoint" />
                  <StatusBadge status="cancelled" label="Cancelled" description="No longer happening" />
                </div>
              </SubSection>

              <SubSection title="Finding Coordinates">
                <p className="text-slate-300 mb-3">
                  To find latitude and longitude for a location:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300">
                  <li>Go to Google Maps</li>
                  <li>Right-click on the exact location</li>
                  <li>Click on the coordinates that appear</li>
                  <li>Copy and paste into the checkpoint form</li>
                </ol>
              </SubSection>

              <SubSection title="Search & Filter">
                <p className="text-slate-300 mb-3">
                  Use the search box to find checkpoints by city, address, or title. Filter by status to view only upcoming, active, completed, or cancelled checkpoints.
                </p>
              </SubSection>
            </Section>

            <Section
              icon={<AlertCircle className="w-6 h-6" />}
              title="Best Practices"
              id="best-practices"
            >
              <BestPractice
                title="Regular Updates"
                description="Check the dashboard daily for new contact submissions and update checkpoint information as it becomes available."
              />
              <BestPractice
                title="Clear Communication"
                description="Update lead statuses promptly and add notes to track all interactions with potential clients."
              />
              <BestPractice
                title="Content Quality"
                description="Write clear, helpful blog posts that answer common questions. Use proper formatting and check for errors before publishing."
              />
              <BestPractice
                title="Verify Information"
                description="Always verify checkpoint information from official sources before marking as verified."
              />
              <BestPractice
                title="Security"
                description="Never share your admin credentials. Log out when finished, especially on shared computers."
              />
            </Section>

            <Section
              icon={<CheckCircle className="w-6 h-6" />}
              title="Quick Reference"
              id="quick-reference"
            >
              <div className="bg-slate-700 rounded-lg p-6 space-y-4">
                <h4 className="font-semibold text-white mb-4">Common Actions</h4>
                <QuickRefItem action="Create blog post" shortcut="Blog Posts → New Post" />
                <QuickRefItem action="View new leads" shortcut="Contact Leads → Filter: New" />
                <QuickRefItem action="Add checkpoint" shortcut="DUI Checkpoints → New Checkpoint" />
                <QuickRefItem action="Publish draft" shortcut="Click eye icon on draft post" />
                <QuickRefItem action="Update lead status" shortcut="Select lead → Change status dropdown" />
              </div>
            </Section>

            <Section
              icon={<AlertCircle className="w-6 h-6" />}
              title="Troubleshooting"
              id="troubleshooting"
            >
              <TroubleshootItem
                problem="Can't log in"
                solution="Verify your email and password. If you've forgotten your password, contact your system administrator."
              />
              <TroubleshootItem
                problem="Changes not appearing on website"
                solution="Make sure the blog post is marked as 'Published'. Clear your browser cache and refresh the page."
              />
              <TroubleshootItem
                problem="Lost unsaved work"
                solution="The CMS does not auto-save. Click Save frequently when editing content."
              />
              <TroubleshootItem
                problem="Can't delete item"
                solution="Make sure you're logged in. Some items may have restrictions. Contact support if the issue persists."
              />
            </Section>

            <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-amber-400 mb-3">Need Help?</h3>
              <p className="text-slate-300">
                If you have questions or encounter issues not covered in this guide, please contact technical support or your system administrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, id, children }: { icon: React.ReactNode; title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8">
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-700">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-amber-400 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function StepBox({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex gap-4 mb-4 bg-slate-700/50 rounded-lg p-4">
      <div className="flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
        {number}
      </div>
      <div>
        <h4 className="font-semibold text-white mb-1">{title}</h4>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function InfoBox({ type, children }: { type: 'info' | 'warning' | 'success'; children: React.ReactNode }) {
  const styles = {
    info: 'bg-blue-500/20 border-blue-500/50 text-blue-200',
    warning: 'bg-orange-500/20 border-orange-500/50 text-orange-200',
    success: 'bg-green-500/20 border-green-500/50 text-green-200',
  };

  return (
    <div className={`mt-4 p-4 rounded-lg border ${styles[type]}`}>
      {children}
    </div>
  );
}

function IconButton({ icon, label, color = 'amber' }: { icon: React.ReactNode; label?: string; color?: string }) {
  const colors = {
    amber: 'bg-gradient-to-r from-amber-500 to-orange-600',
    blue: 'bg-blue-600',
    red: 'bg-red-600',
    slate: 'bg-slate-600',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 ${colors[color as keyof typeof colors]} text-white text-xs rounded`}>
      {icon}
      {label}
    </span>
  );
}

function StatusBadge({ status, label, description }: { status: string; label: string; description: string }) {
  const colors = {
    new: 'bg-blue-600',
    contacted: 'bg-yellow-600',
    qualified: 'bg-green-600',
    closed: 'bg-slate-600',
    upcoming: 'bg-blue-600',
    active: 'bg-green-600',
    completed: 'bg-slate-600',
    cancelled: 'bg-red-600',
  };

  return (
    <div className="bg-slate-700 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-1">
        <span className={`px-2 py-1 ${colors[status as keyof typeof colors]} text-white text-xs font-medium rounded`}>
          {label}
        </span>
      </div>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
}

function BestPractice({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-4 mb-4">
      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
      <div>
        <h4 className="font-semibold text-white mb-1">{title}</h4>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function QuickRefItem({ action, shortcut }: { action: string; shortcut: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-300">{action}</span>
      <code className="px-2 py-1 bg-slate-800 text-amber-400 rounded text-xs">{shortcut}</code>
    </div>
  );
}

function TroubleshootItem({ problem, solution }: { problem: string; solution: string }) {
  return (
    <div className="mb-4 bg-slate-700 rounded-lg p-4">
      <div className="flex items-start gap-2 mb-2">
        <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
        <h4 className="font-semibold text-white">{problem}</h4>
      </div>
      <p className="text-sm text-slate-300 ml-6">{solution}</p>
    </div>
  );
}
