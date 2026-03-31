# Premier Dental NC -- SEO Score Report (Post-Optimization)
**Date:** March 30, 2026
**Site:** https://premierdentalnc.com
**Platform:** Astro + Vercel (static site generation)
**Analysis method:** Source code audit (Vercel challenge mode blocks crawlers)

---

## 1. Overall SEO Score: 83/100

### Category Breakdown

| Category                        | Weight | Score  | Weighted |
|---------------------------------|--------|--------|----------|
| A. On-Page SEO                  | 25%    | 88/100 | 22.0     |
| B. Technical SEO                | 25%    | 82/100 | 20.5     |
| C. Content & E-E-A-T            | 20%    | 85/100 | 17.0     |
| D. Local SEO                    | 20%    | 80/100 | 16.0     |
| E. User Experience & Conversion | 10%    | 75/100 | 7.5      |
| **TOTAL**                       |        |        | **83.0** |

---

## 2. Score Comparison Table

| Metric                     | WordPress (Old) | First Astro Build | Previous Audit | Current (Post-Optimization) |
|----------------------------|:---------------:|:-----------------:|:--------------:|:---------------------------:|
| **Overall Score**          | 38              | 62                | 72             | **83**                      |
| On-Page SEO                | 30              | 60                | 70             | **88**                      |
| Technical SEO              | 35              | 70                | 75             | **82**                      |
| Content & E-E-A-T          | 25              | 55                | 65             | **85**                      |
| Local SEO                  | 45              | 60                | 72             | **80**                      |
| UX & Conversion            | 50              | 65                | 70             | **75**                      |
| **Delta from previous**    | --              | +24               | +10            | **+11**                     |

**Total improvement from WordPress: +45 points (118% increase)**

---

## 3. What Improved (72 --> 83)

### On-Page SEO (70 --> 88) -- Biggest Jump

- **Service page content depth:** All 6 service pages expanded from ~600 words to 1,500+ words with proper H2/H3 hierarchy, procedure breakdowns, "Why Choose Us" sections, process steps, insurance/pricing info, and internal links to blog posts and sister service pages. This is a major ranking signal improvement.
- **Internal linking network:** 140+ internal links added across 40 blog posts, plus service pages now link to related blog guides and other service pages. The restorative dentistry page alone has 6+ outbound internal links to blog posts and 2 cross-links to other service pages.
- **FAQ sections on service pages:** Each service page now has 5+ contextual FAQ items with internal links embedded in answers (e.g., links to blog/root-canal-therapy, blog/dental-bridges, etc.).
- **Blog volume:** 46 total posts (up from 40), with 6 new high-value, keyword-targeted posts including "Best Dentist in Albemarle NC," "Dental Implants Cost Charlotte NC 2026," and "Emergency Dentist Charlotte NC."

### Content & E-E-A-T (65 --> 85)

- **Patient testimonials:** 6 detailed testimonials with patient name, location, service type, and star ratings. AggregateRating schema (4.9 stars, 127 reviews) embedded in Dentist schema on homepage.
- **Content depth and specificity:** Blog posts now include specific pricing ranges (e.g., implant costs $3,000-$5,500), insurance details, procedural steps, and recovery guidance -- all strong E-E-A-T signals.
- **Service page authority:** Each service page reads like a comprehensive resource, not a thin landing page. Topics covered include what the procedure is, why it matters, specific sub-procedures, quality materials, process steps, FAQs, insurance, and related resources.

### Technical SEO (75 --> 82)

- **Schema markup expansion:**
  - Homepage: Dentist schema + FAQPage schema (8 Q&A pairs)
  - All 6 service pages: MedicalWebPage + MedicalProcedure schema
  - All 46 blog posts: BlogPosting schema with headline, datePublished, author, publisher, articleSection
  - AggregateRating (4.9/5, 127 reviews) on homepage Dentist schema
- **301 redirects:** 60+ permanent redirects from old WordPress URLs (blog slugs, service slugs, category/author/portfolio patterns, sitemap XMLs) in vercel.json. This preserves link equity from the old site.
- **robots.txt:** Clean, allows all crawlers, points to correct sitemap at /sitemap-index.xml.

### Local SEO (72 --> 80)

- **Dual-location NAP:** Both Albemarle and Charlotte addresses, phone numbers, and hours in Dentist schema.
- **Geo-targeted content:** New blog posts explicitly target "Albemarle NC" and "Charlotte NC" keywords. Service pages mention Stanly County, Mecklenburg County, Locust, Oakboro, and surrounding communities.
- **areaServed schema:** Albemarle and Charlotte listed as City entities.

---

## 4. What Is Still Missing

### Critical (High Impact) -- Would push score to 88-90

1. **GA4 tracking ID is a placeholder.** Layout.astro has `G-XXXXXXXXXX` -- this means zero analytics data is being collected. No data = no ability to measure SEO performance, identify top pages, or track conversions. This is the single most urgent fix.

2. **No FAQPage schema on service pages.** Service pages have visible FAQ accordions with 5+ questions each, but only the homepage has a FAQPage JSON-LD schema. Google cannot generate FAQ rich snippets for service pages without this structured data. All 6 service pages should pass their FAQ data as an extraSchema.

3. **No dedicated location pages.** The site serves two distinct markets (Albemarle and Charlotte) but has no standalone /locations/albemarle or /locations/charlotte pages. Dedicated location pages with unique content, embedded maps, directions, and LocalBusiness schema for each location would significantly improve local pack rankings.

4. **No sitemap.xml found in public/.** Astro can auto-generate sitemaps with @astrojs/sitemap, but no sitemap files were found in the public directory. The robots.txt points to /sitemap-index.xml -- if Astro is not configured to generate this, Google is hitting a 404 on the sitemap. Verify this is working in production.

5. **No BreadcrumbList schema.** Blog posts have visual breadcrumbs (Home > Blog > Title) but no BreadcrumbList JSON-LD. Adding this schema enables breadcrumb rich snippets in Google search results.

### Medium Priority -- Would push score to 90-92

6. **Blog post images lack descriptive alt text.** The featured image on each blog post uses `alt={post.title}` -- the post title is not always a good image description. Alt text should describe the image content specifically.

7. **No Open Graph image per page.** The Layout.astro defaults ogImage to `/og-image.jpg` for all pages. Service pages and blog posts should have unique OG images for better social sharing appearance.

8. **Service page FAQs not in schema.** As noted above, but also -- the FAQ answers on service pages contain internal links (HTML), but the FAQPage schema answers should be plain text. If/when adding schema, strip HTML from FAQ answer text.

9. **No hreflang or language signals beyond lang="en".** Not critical for a single-language US site, but worth noting.

10. **No explicit author pages or author schema.** BlogPosting schema lists author as "Premier Dental" (Organization). For stronger E-E-A-T, consider adding individual dentist author profiles with credentials.

### Low Priority / Nice-to-Have -- Would push score to 93-95

11. **No Google Business Profile link or "Place" schema.** Adding sameAs links to Google Business Profile, Facebook, etc. in the Dentist schema strengthens entity connections.

12. **No review/testimonial schema on individual pages.** AggregateRating is on the homepage, but individual Review schema items are not included.

13. **Image optimization verification needed.** Images are served from /wp-content/uploads/ paths (legacy WordPress structure). Verify these are in WebP format and properly sized. Consider moving to a modern /images/ directory structure.

14. **No preload hints for LCP image.** The hero section likely has a large image that should use `<link rel="preload">` for faster Largest Contentful Paint.

15. **Contact form success tracking.** Formspree is connected but no conversion tracking event is fired on submission (GA4 placeholder means this cannot work regardless).

---

## 5. Projected Score After Remaining Fixes

| Fix Applied                                       | Estimated Score Impact |
|---------------------------------------------------|:----------------------:|
| Current score                                     | 83                     |
| + Real GA4 tracking ID                            | +1                     |
| + FAQPage schema on all 6 service pages           | +2                     |
| + Dedicated location pages (Albemarle + Charlotte) | +3                     |
| + Verify/fix sitemap generation                   | +1                     |
| + BreadcrumbList schema on blog posts             | +1                     |
| + Unique OG images per page                       | +1                     |
| + Individual author profiles with credentials     | +1                     |
| + Google Business Profile sameAs links            | +1                     |
| **Projected score after all fixes**               | **~93-94/100**         |

---

## 6. Priority Action Plan

### Immediate (This Week)

1. **Replace GA4 placeholder** -- Update `G-XXXXXXXXXX` in `src/layouts/Layout.astro` with real GA4 Measurement ID. Without this, every other optimization is unmeasurable.

2. **Add FAQPage schema to service pages** -- Each service page already has FAQ data in the template. Extract the Q&A pairs into a faqSchema object (same pattern as index.astro) and pass via `extraSchemas={[faqSchema]}` on the ServiceLayout component.

3. **Verify sitemap generation** -- Confirm `@astrojs/sitemap` is installed and configured in `astro.config.mjs`. Check that https://premierdentalnc.com/sitemap-index.xml returns a valid XML sitemap in production.

### Next Sprint (1-2 Weeks)

4. **Create dedicated location pages** -- Build `/locations/albemarle` and `/locations/charlotte` with unique content, embedded Google Maps, driving directions, nearby landmarks, and individual LocalBusiness schema for each office.

5. **Add BreadcrumbList schema** -- Add to `[slug].astro` blog template and service page templates.

6. **Add sameAs links** -- Update Dentist schema on homepage to include Google Business Profile URL, Facebook page, and any other official profiles.

### Ongoing

7. **Publish 2-4 new blog posts per month** targeting local keywords (e.g., "dentist near me Albemarle," "best Invisalign provider Charlotte NC 2026," "dental cleaning cost NC").

8. **Collect and add more patient reviews** -- Update AggregateRating reviewCount as new Google reviews come in. Consider adding individual Review schema items.

9. **Monitor Core Web Vitals** in Google Search Console once GA4 is connected.

---

## 7. Summary

The Premier Dental site has undergone a remarkable transformation. Going from a 38/100 WordPress site to an 83/100 Astro/Vercel site represents a complete overhaul of the site's SEO foundation. The most impactful recent changes were:

- Expanding service pages from thin 600-word pages to comprehensive 1,500+ word resources
- Building a 140+ internal link network across 46 blog posts
- Adding structured data (Dentist, FAQPage, BlogPosting, MedicalWebPage, MedicalProcedure, AggregateRating)
- Implementing 60+ 301 redirects to preserve old WordPress link equity
- Adding patient testimonials with review schema

The remaining gap from 83 to 93+ is primarily about **local SEO depth** (dedicated location pages), **schema completeness** (FAQPage on service pages, BreadcrumbList), and **measurement infrastructure** (real GA4 ID). These are all straightforward fixes that can be executed in 1-2 sprints.

---

*Report generated: March 30, 2026*
*Methodology: Full source code audit of Astro components, layouts, schemas, data files, redirects, and configuration*
