import { site } from "@/lib/site";
import { pageContent } from "@/lib/page-content";

export const dynamic = "force-static";

/**
 * A JSON Resume (https://jsonresume.org) shaped export — a reshape of the
 * same English content the /experience page renders, not new authoring.
 * Canonically English, matching /llms.txt's convention.
 */
export async function GET() {
  const content = pageContent("en");

  const resume = {
    basics: {
      name: site.name,
      label: site.role,
      email: site.email,
      url: site.url,
      location: { city: site.location },
      profiles: site.socials.map((s) => ({ network: s.label, url: s.href })),
    },
    work: content.roles.map((r) => {
      const [startDate, endDate] = r.period.split(" — ");
      return {
        name: r.org,
        position: r.title,
        location: r.place,
        startDate,
        endDate: endDate === "Present" ? undefined : endDate,
        highlights: r.points,
      };
    }),
    education: [
      {
        institution: content.education.org,
        area: content.education.degree,
        studyType: "MSc",
        startDate: content.education.period.split(" — ")[0],
        endDate: content.education.period.split(" — ")[1],
        score: content.education.detail,
      },
    ],
  };

  return new Response(JSON.stringify(resume, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
