import type { ReactNode } from 'react';
import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  FileText,
  Link2,
  LogIn,
  Mail,
  MapPin,
} from 'lucide-react';

import { SEO } from '../lib/seo';

const quickLinks = [
  { href: '#getting-started', label: 'Getting started' },
  { href: '#daily-work', label: 'Daily work' },
  { href: '#publishing', label: 'Publishing' },
  { href: '#leads', label: 'Leads' },
  { href: '#google-connections', label: 'Google connections' },
  { href: '#checkpoints', label: 'Checkpoint workflow' },
  { href: '#troubleshooting', label: 'Troubleshooting' },
];

function Section({
  id,
  icon,
  title,
  description,
  children,
}: {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 rounded-[2rem] border border-brand-black/10 bg-white p-8 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-mango/12 text-brand-mangoText">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-brand-black">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-brand-black/65">{description}</p>
        </div>
      </div>
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  );
}

function StepList({
  title,
  steps,
}: {
  title: string;
  steps: string[];
}) {
  return (
    <div className="rounded-[1.5rem] border border-brand-black/8 bg-brand-offWhite/55 p-5">
      <h3 className="text-lg font-semibold text-brand-black">{title}</h3>
      <ol className="mt-4 space-y-3 text-sm text-brand-black/68">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mango/15 text-xs font-bold text-brand-mangoText">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Note({
  tone = 'info',
  children,
}: {
  tone?: 'info' | 'warning' | 'success';
  children: ReactNode;
}) {
  const toneClasses =
    tone === 'warning'
      ? 'border-amber-500/30 bg-amber-50 text-amber-950'
      : tone === 'success'
      ? 'border-brand-leaf/25 bg-brand-leaf/8 text-brand-black'
      : 'border-brand-black/10 bg-white text-brand-black/72';

  return <div className={`rounded-[1.25rem] border p-4 text-sm leading-relaxed ${toneClasses}`}>{children}</div>;
}

export default function AdminGuidePage() {
  return (
    <div className="min-h-screen bg-brand-offWhite py-12">
      <SEO title="Admin Guide | Mango Law LLC" noindex={true} />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-brand-black/10 bg-gradient-to-br from-brand-black via-[#153023] to-brand-forest px-8 py-10 text-white shadow-soft-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-mango">Admin Guide</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight">
            The current workflow for content, leads, search connections, and checkpoint updates.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/75">
            This guide is organized around the work that happens most often. Start with the daily tasks, then use the connection and troubleshooting sections when something needs setup or attention.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {quickLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/88 transition hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <Section
          id="getting-started"
          icon={<LogIn className="h-6 w-6" />}
          title="Getting started"
          description="Use the admin area for operational work only. The login and dashboard are internal tools and should not expose infrastructure details or old environment-specific instructions."
        >
          <StepList
            title="Sign in"
            steps={[
              'Go to /admin/login and sign in with your authorized Mango Law account.',
              'After sign-in, you land on the dashboard with the daily-work tabs first.',
              'Use the dashboard for publishing, lead review, search visibility, and handoff docs. Use /admin/connections only when you need to connect or re-check Google tools.',
            ]}
          />

          <Note tone="success">
            The dashboard is organized by daily work first: new leads, publishing, search visibility, review outreach, then secondary operations.
          </Note>
        </Section>

        <Section
          id="daily-work"
          icon={<BookOpen className="h-6 w-6" />}
          title="Daily work"
          description="The most important day-to-day tasks are lead follow-up, publishing, and visibility checks. Those should happen before configuration cleanup or documentation work."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <StepList
              title="Recommended order each day"
              steps={[
                'Review new leads first and update statuses so nothing urgent sits untouched.',
                'Check the search/SEO workspace for indexing, ranking, or connector issues that need immediate action.',
                'Publish or revise content once the lead and visibility work is stable.',
                'Use review campaigns, reviews, and social promotion after the core intake and content work is under control.',
              ]}
            />
            <StepList
              title="Quick navigation"
              steps={[
                'New Leads: triage inbound inquiries and update status.',
                'Publishing: create, edit, and publish blog content.',
                'Search Visibility: check Search Console-connected data, ranking snapshots, and SEO tasks.',
                'Review Campaigns / Google Reviews: manage client-review workflows and responses.',
              ]}
            />
          </div>
        </Section>

        <Section
          id="publishing"
          icon={<FileText className="h-6 w-6" />}
          title="Publishing and content updates"
          description="The publishing flow should be simple: draft, review, publish, then confirm the post or page is actually live and linked where it needs to be."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <StepList
              title="Publish a new article"
              steps={[
                'Open the Publishing workspace and create or edit the article.',
                'Fill in the title, slug, excerpt, body, category, and any required review metadata.',
                'Publish only after the page reads cleanly, links are correct, and the live route is the intended one.',
                'After publishing, verify the public page and confirm it appears in the blog index or supporting link modules where expected.',
              ]}
            />
            <StepList
              title="When revising existing content"
              steps={[
                'Keep the live URL stable unless there is an explicit redirect plan.',
                'Use the article/page to solve a visitor problem first, then make sure the supporting SEO elements still align.',
                'If the change affects approved/protected content, log it in the content changelog before wrapping up.',
              ]}
            />
          </div>

          <Note>
            The admin guide should reinforce current live workflows, not legacy setup assumptions. If a route, page type, or publishing rule changes, update this guide alongside the interface.
          </Note>
        </Section>

        <Section
          id="leads"
          icon={<Mail className="h-6 w-6" />}
          title="Lead review and intake follow-up"
          description="The lead workspace is for fast triage. Keep statuses accurate, add notes where useful, and make sure the next action is obvious."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <StepList
              title="Lead handling"
              steps={[
                'Open New Leads first and review the most recent submissions.',
                'Update the status after the first real follow-up attempt so the queue stays current.',
                'Use internal notes for details that matter to follow-up, not for public-facing copy.',
                'Close or qualify leads only when the outcome is clear enough that another team member could understand the record.',
              ]}
            />
            <div className="space-y-4">
              <Note tone="success">
                Prioritize lead speed over dashboard perfection. The point of the CRM view is to avoid dropped inquiries and keep the follow-up queue honest.
              </Note>
              <Note>
                If a lead seems tied to a content or tracking problem, check the Search Visibility or Publishing workspace after the intake step is covered.
              </Note>
            </div>
          </div>
        </Section>

        <Section
          id="google-connections"
          icon={<Link2 className="h-6 w-6" />}
          title="Google connections"
          description="Use the Connections page to connect Google Business Profile, Analytics, Search Console, and Tag Manager, then save the correct account/resource for mango.law."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <StepList
              title="Connect or reconnect a Google tool"
              steps={[
                'Open /admin/connections and choose Connect or Reconnect for the product you need.',
                'Complete the Google consent flow using the account that actually owns or has access to the resource.',
                'Run Check status to load the accounts, properties, containers, or sites available to that connection.',
                'Select the correct resource and click Save before leaving the page.',
              ]}
            />
            <StepList
              title="Resource selection defaults"
              steps={[
                'Search Console: prefer sc-domain:mango.law when available; use https://mango.law/ as the fallback.',
                'Analytics: choose the production GA4 property for mango.law, not a stale test property.',
                'Tag Manager: choose the production web container for mango.law.',
                'Business Profile: choose the Mango Law LLC location tied to the live office listing.',
              ]}
            />
          </div>

          <Note tone="warning">
            If the Google consent screen shows the Supabase project domain, the connection can still work. Do not recreate retired hostnames such as <code>api.mango.law</code> just to change the label on the consent screen.
          </Note>

          <Note>
            When something looks empty, the usual causes are the wrong Google user, missing permissions, or a resource that has not been created yet. Reconnect with the correct account, then run Check status again.
          </Note>
        </Section>

        <Section
          id="checkpoints"
          icon={<MapPin className="h-6 w-6" />}
          title="Checkpoint workflow"
          description="Checkpoint management is for announced/public notice content, not speculation. The public page should stay accurate about what was announced and how visitors should use the information."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <StepList
              title="Checkpoint updates"
              steps={[
                'Review announced notices, source URLs, county/city details, and dates before marking anything verified.',
                'Keep the public-facing framing focused on announced checkpoints and rights guidance, not real-time prediction.',
                'If you edit checkpoint copy or related FAQ guidance, verify the public page still reads as a legal guide rather than a utility feed.',
              ]}
            />
            <div className="space-y-4">
              <Note tone="success">
                The checkpoint page works best when the map, list, and rights guidance support each other. If one module becomes noisy or speculative, simplify it instead of adding more layers.
              </Note>
              <Note>
                Save the source and announcement details whenever possible so the public page can explain where a notice came from.
              </Note>
            </div>
          </div>
        </Section>

        <Section
          id="troubleshooting"
          icon={<AlertCircle className="h-6 w-6" />}
          title="Troubleshooting"
          description="Use these checks before assuming a code change is required."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <StepList
              title="If a Google integration looks wrong"
              steps={[
                'Reconnect with the correct Google user.',
                'Run Check status again after permissions are granted.',
                'Verify the selected resource is the production mango.law resource, not a stale or preview property.',
              ]}
            />
            <StepList
              title="If a content change is not visible"
              steps={[
                'Confirm the item is actually published and linked where expected.',
                'Verify the public route itself instead of relying only on the dashboard state.',
                'If the live page is missing, treat it as a deploy or release-path issue before assuming the content is gone.',
              ]}
            />
          </div>

          <Note>
            When the issue is operational rather than editorial, document what happened in the appropriate runbook or ticket so the next person is not reconstructing context from scratch.
          </Note>
        </Section>

        <div className="rounded-[1.75rem] border border-brand-black/10 bg-white px-6 py-5 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-mango/12 text-brand-mangoText">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-brand-black">Keep the guide current</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-black/68">
                This page should mirror the actual admin workflow. If the dashboard, connections flow, or publishing rules change, update this guide in the same pass so the visible documentation does not drift from the live system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
