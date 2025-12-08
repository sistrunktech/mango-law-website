import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PracticeAreasPage from './pages/PracticeAreasPage';
import OviDuiPage from './pages/OviDuiPage';
import CriminalDefensePage from './pages/CriminalDefensePage';
import DrugCrimePage from './pages/DrugCrimePage';
import SexCrimePage from './pages/SexCrimePage';
import WhiteCollarPage from './pages/WhiteCollarPage';
import ProtectionOrderPage from './pages/ProtectionOrderPage';
import PersonalInjuryPage from './pages/PersonalInjuryPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import GlossaryPage from './pages/GlossaryPage';
import OfCounselPage from './pages/OfCounselPage';
import ServiceAreasPage from './pages/ServiceAreasPage';
import DUICheckpointsPage from './pages/DUICheckpointsPage';
import CheckpointAdminPage from './pages/CheckpointAdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminGuidePage from './pages/AdminGuidePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import BrandGuidelinesPage from './pages/BrandGuidelinesPage';
import HandoffSharePage from './pages/HandoffSharePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
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
    </AuthProvider>
  );
}

export default App;
