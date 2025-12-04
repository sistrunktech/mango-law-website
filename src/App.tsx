import { Routes, Route } from 'react-router-dom';
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
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

function App() {
  return (
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
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
