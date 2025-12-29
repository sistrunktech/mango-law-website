import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PracticeAreasPage = lazy(() => import('./pages/PracticeAreasPage'));
const OviDuiPage = lazy(() => import('./pages/OviDuiPage'));
const CriminalDefensePage = lazy(() => import('./pages/CriminalDefensePage'));
const DrugCrimePage = lazy(() => import('./pages/DrugCrimePage'));
const SexCrimePage = lazy(() => import('./pages/SexCrimePage'));
const WhiteCollarPage = lazy(() => import('./pages/WhiteCollarPage'));
const ProtectionOrderPage = lazy(() => import('./pages/ProtectionOrderPage'));
const PersonalInjuryPage = lazy(() => import('./pages/PersonalInjuryPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'));
const OfCounselPage = lazy(() => import('./pages/OfCounselPage'));
const ServiceAreasPage = lazy(() => import('./pages/ServiceAreasPage'));
const DUICheckpointsPage = lazy(() => import('./pages/DUICheckpointsPage'));
const BondJailInfoPage = lazy(() => import('./pages/BondJailInfoPage'));
const WhatToDoAfterOVIPage = lazy(() => import('./pages/WhatToDoAfterOVIPage'));
const CheckpointAdminPage = lazy(() => import('./pages/CheckpointAdminPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminGuidePage = lazy(() => import('./pages/AdminGuidePage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const BrandGuidelinesPage = lazy(() => import('./pages/BrandGuidelinesPage'));
const HandoffSharePage = lazy(() => import('./pages/HandoffSharePage'));
const ConnectionsPage = lazy(() => import('./pages/ConnectionsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="min-h-screen bg-brand-offWhite text-brand-black flex items-center justify-center">
            <div className="text-sm text-brand-black/60">Loading…</div>
          </div>
        }
      >
        <Routes>
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/admin/reset-password" element={<ResetPasswordPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/connections" element={<ConnectionsPage />} />
          <Route path="/docs/admin-guide" element={<AdminGuidePage />} />
          <Route path="/handoff/:token" element={<HandoffSharePage />} />
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/practice-areas" element={<PracticeAreasPage />} />
                  <Route path="/ovi-dui-defense-delaware-oh" element={<OviDuiPage />} />
                  <Route path="/criminal-defense-delaware-oh" element={<CriminalDefensePage />} />
                  <Route path="/drug-crime-lawyer-delaware-oh" element={<DrugCrimePage />} />
                  <Route path="/sex-crime-defense-lawyer-delaware-oh" element={<SexCrimePage />} />
                  <Route path="/white-collar-crimes-attorney-delaware-oh" element={<WhiteCollarPage />} />
                  <Route path="/protection-order-lawyer-delaware-oh" element={<ProtectionOrderPage />} />
                  <Route path="/personal-injury-lawyer-delaware-oh" element={<PersonalInjuryPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/glossary" element={<GlossaryPage />} />
                  <Route path="/of-counsel" element={<OfCounselPage />} />
                  <Route path="/locations" element={<ServiceAreasPage />} />
                  <Route path="/resources/dui-checkpoints" element={<DUICheckpointsPage />} />
                  <Route path="/resources/bond-jail-information" element={<BondJailInfoPage />} />
                  <Route path="/resources/what-to-do-after-ovi-arrest" element={<WhatToDoAfterOVIPage />} />
                  <Route path="/admin/checkpoints" element={<CheckpointAdminPage />} />
                  <Route path="/brand-guide" element={<BrandGuidelinesPage />} />
                  <Route path="/brand-guidelines" element={<BrandGuidelinesPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
