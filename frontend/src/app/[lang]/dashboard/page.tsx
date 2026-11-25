import type { Metadata } from "next";
import { getDictionary, isValidLocale, defaultLocale, locales } from "../../../dictionaries";
import { DashboardWorkspace } from "../../../components/DashboardWorkspace";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const safeLang = isValidLocale(lang) ? lang : defaultLocale;
  const page = getDictionary(safeLang).dashboardPage;
  const baseUrl = "https://wapromo.id";

  return {
    title: page.metaTitle,
    alternates: {
      canonical: `${baseUrl}/${safeLang}/dashboard`,
      languages: {
        id: `${baseUrl}/id/dashboard`,
        en: `${baseUrl}/en/dashboard`,
        pt: `${baseUrl}/pt/dashboard`,
        es: `${baseUrl}/es/dashboard`,
        ar: `${baseUrl}/ar/dashboard`,
        "x-default": `${baseUrl}/en/dashboard`,
      },
    },
  };
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = isValidLocale(lang) ? lang : defaultLocale;
  const dictionary = getDictionary(safeLang);

  return (
    <DashboardWorkspace
      page={dictionary.dashboardPage}
      lang={safeLang}
      accountDefaults={{
        ownerName: dictionary.registerOwnerPage.demoOwnerName,
        businessName: dictionary.registerOwnerPage.demoBusinessName,
        email: dictionary.registerOwnerPage.demoEmail,
      }}
    />
  );
}