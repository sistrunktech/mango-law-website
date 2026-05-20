import StructuredData from '@/components/StructuredData';
import UnionCountyOviCriminalDefensePreviewPage, {
  unionCountyLocationFaqs,
} from '@/views/UnionCountyOviCriminalDefensePreviewPage';
import { unionCountyLocationBreadcrumbs, unionCountyLocationSeo } from './metadata';

export { metadata } from './metadata';

export default function Page() {
  return (
    <>
      <StructuredData
        faqs={unionCountyLocationFaqs}
        breadcrumbs={unionCountyLocationBreadcrumbs}
        url={unionCountyLocationSeo.url}
        canonicalUrl={unionCountyLocationSeo.canonicalUrl}
      />
      <UnionCountyOviCriminalDefensePreviewPage />
    </>
  );
}
