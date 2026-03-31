# SEO AUDIT REPORT: premierdentalnc.com (New Astro/Vercel Site)
## Premier Dental - Albemarle & Charlotte, NC
### Audit Date: March 30, 2026
### Audited by: Rich Marketing SEO Team
### Previous Score (WordPress): 38/100

---

## OVERALL SEO SCORE: 62/100

| Category | Score | Weight | Weighted |
|---|---|---|---|
| On-Page SEO | 72/100 | 25% | 18.0 |
| Technical SEO | 55/100 | 25% | 13.75 |
| Content & E-E-A-T | 68/100 | 20% | 13.6 |
| Local SEO | 58/100 | 20% | 11.6 |
| UX & Conversion | 52/100 | 10% | 5.2 |
| **TOTAL** | | | **62.15 -> 62/100** |

---

## EXECUTIVE SUMMARY

The new Astro/Vercel rebuild represents a significant improvement over the old WordPress site (38/100 to 62/100), but the migration is **incomplete and creating serious SEO damage right now**. The single most critical finding is that the **homepage at premierdentalnc.com/ is still serving the OLD WordPress site** (WordPress 6.9.4, Elementor 3.23.3, Yoast SEO), while new Astro pages like `/our-work`, `/services/restorative-dentistry`, `/services/cosmetic-dentistry`, and `/blog` are live on Vercel. This split-brain deployment means Google is seeing two different technology stacks, conflicting sitemaps, and duplicate content for many URLs. Additionally, there is a critical bug where **service page schemas are defined in source code but never rendered to the HTML** because the ServiceLayout component does not pass the `schema` prop through to the Layout component. The blog posts (40 total, not 72 as expected) also lack any structured data.

The Astro pages that ARE live show dramatically improved SEO: proper title tags with geo-targeting ("Albemarle & Charlotte, NC"), well-crafted meta descriptions, proper Open Graph tags, keywords meta tags, MedicalWebPage schema on `/our-work`, and internal links in FAQ answers. The foundation is excellent -- the site just needs the migration completed and several bugs fixed to reach 80+ territory.

---

## 2. STRENGTHS (What the New Site Does Right)

1. **Excellent title tag structure on Astro pages** -- Service pages use the pattern "Service Name | Premier Dental | Albemarle & Charlotte, NC" which is ideal for local SEO. Example: "Restorative Dentistry | Premier Dental | Albemarle & Charlotte, NC".

2. **Rich Dentist schema on homepage (in source code)** -- The `index.astro` file includes a comprehensive `@type: Dentist` schema with both office addresses, phone numbers, opening hours, area served (Albemarle + Charlotte), email, price range, and a full OfferCatalog listing all 7 service categories. This is textbook-perfect dental schema.

3. **FAQPage schema on homepage (in source code)** -- 8 well-written FAQ items covering new patients, insurance, emergency care, cleanings, EMFACE, implant costs, hours, and Invisalign. Each answer includes internal links to relevant service pages.

4. **MedicalWebPage schema on /our-work** -- Proper schema with ItemList of patient cases. This is above-average for dental sites.

5. **MedicalWebPage + MedicalProcedure schema on service pages (in source code)** -- Restorative dentistry page defines proper medical procedure schema. (NOTE: Not rendering -- see Critical Issues.)

6. **Internal links in FAQ answers** -- Every FAQ answer links to a relevant service page or section. This is excellent for topical authority and crawlability.

7. **Clean URL structure** -- `/services/restorative-dentistry`, `/services/cosmetic-dentistry`, `/blog/[slug]` -- well-organized, keyword-rich, and hierarchical.

8. **Proper canonical tags** -- Layout.astro automatically generates canonical URLs from `Astro.url.href`.

9. **Comprehensive Open Graph implementation** -- All Astro pages have og:title, og:description, og:image, og:url, og:site_name, og:locale, and twitter:card.

10. **Keywords meta tag** -- Each page has relevant, location-targeted keywords. While Google says they don't use this, other search engines do, and it shows intentional optimization.

11. **Sitemap integration** -- `@astrojs/sitemap` is installed and configured with the correct site URL.

12. **Breadcrumb navigation on blog posts** -- Proper Home > Blog > Post title breadcrumbs with links.

13. **Astro static generation** -- Pages are pre-rendered at build time, meaning near-zero JavaScript payload and excellent Core Web Vitals potential.

14. **Proper meta robots** -- `index, follow` on all Astro pages.

15. **Before/after gallery on /our-work** -- 6 patient cases with category descriptions -- excellent for E-E-A-T and conversion.

---

## 3. CRITICAL ISSUES (Must Fix Immediately -- High Impact)

### CRITICAL 1: Homepage Still Serving WordPress (Severity: 10/10)

**Problem:** The root URL `https://premierdentalnc.com/` is still serving the old WordPress site. Evidence:
- `generator` meta tag shows "WordPress 6.9.4" and "Elementor 3.23.3"
- Images reference `/wp-content/uploads/` paths from the WordPress install
- Yoast SEO is generating the meta tags, not Astro
- The Dentist schema and FAQPage schema defined in `index.astro` are NOT rendering on the live site
- The title tag is the old "Premier Dental - Home" instead of the Astro version "Premier Dental | Dentist in Albemarle & Charlotte, NC | Comprehensive Dental Care"

**Impact:** The homepage is the most important page for SEO. All the schema work, title tag optimization, and FAQ internal linking is invisible to Google. The homepage is still showing the old 38/100 quality to search engines.

**Fix:** Complete the DNS/deployment migration so the Astro build on Vercel serves ALL routes, including the root `/`. This likely requires updating the domain's DNS to point entirely to Vercel, or configuring WordPress to stop serving the homepage.

**Owner:** @website-builder

---

### CRITICAL 2: Service Page Schemas Not Rendering (Severity: 9/10)

**Problem:** The `ServiceLayout.astro` component does NOT accept or pass a `schema` prop to `Layout.astro`. Service pages like `restorative-dentistry.astro` define schema objects (MedicalWebPage, MedicalProcedure) but they are never injected into the HTML.

**Evidence:** The ServiceLayout interface only has `title`, `description`, and `keywords`:
```typescript
interface Props {
  title: string;
  description: string;
  keywords?: string;
}
```

But the restorative-dentistry page defines a `schema` const that is never used:
```javascript
const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  ...
};
```

**Fix:** Update `ServiceLayout.astro` to accept and pass `schema` and `extraSchemas` props:

```astro
---
import Layout from './Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description: string;
  keywords?: string;
  schema?: object;
  extraSchemas?: object[];
}

const { title, description, keywords, schema, extraSchemas } = Astro.props;
---

<Layout title={title} description={description} keywords={keywords} schema={schema} extraSchemas={extraSchemas}>
  <Header />
  <main class="pt-16 lg:pt-20">
    <slot />
  </main>
  <Footer />
</Layout>
```

Then update each service page to pass the schema:
```astro
<ServiceLayout
  title="Restorative Dentistry | Premier Dental | Albemarle & Charlotte, NC"
  description="..."
  keywords="..."
  schema={schema}
>
```

**Owner:** @website-builder

---

### CRITICAL 3: Split-Brain Deployment Creating Duplicate Content (Severity: 9/10)

**Problem:** The site is serving content from TWO different systems simultaneously:
- **WordPress** serves: `/` (homepage), `/about-us`, `/contacts`, `/faqs`, `/treatments`, `/dentistry`, `/noda`, `/restorative-dentistry` (old path), `/cosmetic-dentistry` (old path), all `/blogs/*` category pages, all individual blog posts at root-level slugs
- **Astro/Vercel** serves: `/our-work`, `/services/restorative-dentistry`, `/services/cosmetic-dentistry`, `/blog`, `/blog/[slug]`

This means:
- Blog posts exist at BOTH `/cosmetic-dentistry` (WordPress) AND `/blog/cosmetic-dentistry` (Astro) -- duplicate content
- Service content exists at BOTH `/restorative-dentistry` (WordPress) AND `/services/restorative-dentistry` (Astro) -- duplicate content
- Two different sitemaps: Yoast's `/sitemap_index.xml` and Astro's `/sitemap-index.xml`

**Impact:** Google will be confused about which version is canonical. This can cause indexing issues, split link equity, and potential ranking penalties.

**Fix:**
1. Complete the full migration to Vercel/Astro
2. Set up 301 redirects from ALL old WordPress URLs to new Astro URLs
3. Remove the Yoast sitemap reference from robots.txt
4. Submit the new Astro sitemap to Google Search Console

**Owner:** @website-builder

---

### CRITICAL 4: robots.txt Still References Old Yoast Sitemap (Severity: 8/10)

**Problem:** The live robots.txt at `premierdentalnc.com/robots.txt` shows:
```
# START YOAST BLOCK
User-agent: *
Disallow:
Sitemap: https://premierdentalnc.com/sitemap_index.xml
# END YOAST BLOCK
```

The Astro robots.txt in `public/robots.txt` references a different sitemap:
```
Sitemap: https://premierdentalnc.com/sitemap-index.xml
```

**Impact:** Google is following the Yoast sitemap which lists OLD WordPress URLs, not the new Astro pages. New pages like `/our-work`, `/services/*`, and `/blog/*` may not be in any sitemap Google is reading.

**Fix:** Once migration is complete, ensure the Astro robots.txt replaces the WordPress one. Verify the Astro-generated sitemap includes all pages.

**Owner:** @website-builder

---

### CRITICAL 5: Blog Post Count Discrepancy (Severity: 6/10)

**Problem:** The brief states 72 blog posts, but `blogPosts.ts` only contains 40 blog posts. Either 32 posts were lost during migration or the count was incorrect.

**Impact:** Lost blog content means lost keyword coverage, lost indexed pages, and potential 404 errors for old URLs.

**Fix:** Audit the WordPress blog posts against `blogPosts.ts` and migrate any missing content.

**Owner:** @content-creator + @website-builder

---

## 4. MEDIUM PRIORITY IMPROVEMENTS

### MEDIUM 1: Blog Posts Lack Schema Markup

**Problem:** Individual blog posts at `/blog/[slug]` have no JSON-LD structured data. For a dental practice blog, each post should have `Article` or `BlogPosting` schema with author information, date published, and image.

**Recommended schema for blog posts:**
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "description": "Post excerpt",
  "image": "/post-image.jpg",
  "datePublished": "2025-03-19",
  "author": {
    "@type": "Organization",
    "name": "Premier Dental",
    "url": "https://premierdentalnc.com"
  },
  "publisher": {
    "@type": "Dentist",
    "name": "Premier Dental"
  }
}
```

**Owner:** @website-builder

---

### MEDIUM 2: No BreadcrumbList Schema

**Problem:** Blog posts have visual breadcrumbs (Home > Blog > Post Title) but no `BreadcrumbList` schema. Google uses this schema to display rich breadcrumbs in search results.

**Fix:** Add BreadcrumbList JSON-LD to blog posts and service pages.

**Owner:** @website-builder

---

### MEDIUM 3: Missing Google Search Console Verification on Astro Pages

**Problem:** The WordPress pages include two Google Search Console verification meta tags, but the Astro Layout.astro does not include them. Once migration is complete, GSC verification could break.

**Fix:** Add to Layout.astro `<head>`:
```html
<meta name="google-site-verification" content="Dw0pgpUuRBZVh3bItCZr9-KSvuN3UiLfJxVCmcyEqvk" />
<meta name="google-site-verification" content="Y-sQyFUBdy3we7buHrGDyrDgR1yjcItNBsmd6E0gRmw" />
```

**Owner:** @website-builder

---

### MEDIUM 4: No Dedicated Location Pages on Astro Site

**Problem:** The WordPress site has `/noda` as a Charlotte location page. The Astro site has no standalone location pages -- locations are only shown as a section on the homepage. Dedicated location pages (e.g., `/locations/albemarle`, `/locations/charlotte-noda`) with unique content, embedded maps, and LocalBusiness schema are critical for local pack rankings.

**Fix:** Create two dedicated location pages with:
- Unique 500+ word content about each office
- Embedded Google Maps
- Office photos
- LocalBusiness schema specific to each location
- NAP information
- Driving directions
- Parking information

**Owner:** @website-builder + @content-creator

---

### MEDIUM 5: Missing About/Team Page on Astro Site

**Problem:** The Astro site has no `/about-us` or `/team` page. The About section is only on the homepage. The WordPress `/about-us` page has team bios with 541 words and 17 images. A standalone About/Team page is important for E-E-A-T (demonstrating expertise of practitioners) and for local SEO.

**Fix:** Create a dedicated `/about` page with:
- Doctor bios with credentials, education, and specializations
- `Person` schema for each dentist
- Professional headshots
- Practice philosophy and history

**Owner:** @website-builder + @content-creator

---

### MEDIUM 6: Missing Contact Page on Astro Site

**Problem:** No dedicated `/contact` page exists on the Astro site. Contact information is only in the homepage footer/section. A standalone contact page with a form, map, NAP, and hours helps with local SEO signals.

**Owner:** @website-builder

---

### MEDIUM 7: Low Internal Link Count on Service Pages

**Problem:** Service pages have only 3-4 internal links. Each service page should link to:
- Related blog posts (e.g., Restorative Dentistry page should link to "Dental Fillings in Charlotte", "Dental Crowns in Charlotte", etc.)
- Other related services
- The contact/appointment section
- The before/after gallery

**Target:** 8-12 contextual internal links per service page.

**Owner:** @content-creator + @website-builder

---

### MEDIUM 8: Homepage Content is Thin (~292 words)

**Problem:** The WordPress homepage (still live) has only ~292 words of main content. Even the Astro homepage, while richer in components, needs to ensure sufficient crawlable text content. Google needs 500-1,000+ words of quality content on a dental homepage to understand the practice's services and expertise.

**Owner:** @content-creator

---

### MEDIUM 9: og:image Using Generic Placeholder

**Problem:** All Astro pages reference `/og-image.jpg` for Open Graph images. Need to verify this file exists and is a compelling, branded image (1200x630 px recommended). Service pages should ideally have unique OG images.

**Fix:** Create a branded OG image and verify it exists in the `public/` directory. Consider unique images for service pages.

**Owner:** @website-builder

---

### MEDIUM 10: No FAQ Page on Astro Site

**Problem:** WordPress has `/faqs` as a dedicated FAQ page. The Astro site only has FAQs as a homepage section. A standalone FAQ page with FAQPage schema can rank for question-based searches and appear in Google's "People Also Ask" boxes.

**Owner:** @website-builder + @content-creator

---

## 5. LOW PRIORITY / QUICK WINS

### LOW 1: Add `rel="noopener noreferrer"` to External Links
Currently no external links were found, but as they are added (Google Maps, social media), ensure proper rel attributes.

### LOW 2: Add `alt` Text Audit for All Images
Blog post images from the WordPress migration have alt text, but some are duplicated or contain the title twice (e.g., "Inlays and Onlays in Cosmetic DentistryInlays and Onlays in Cosmetic Dentistry"). Audit and fix all alt text.
**Owner:** @content-creator

### LOW 3: Add Structured Data for Reviews/Testimonials
If the practice has Google reviews, consider adding `AggregateRating` to the Dentist schema. This can trigger star ratings in search results.
**Owner:** @website-builder

### LOW 4: Add `hreflang` Tags (If Needed)
No hreflang tags found. If the practice serves Vietnamese-speaking patients (as suggested by Dr. names), consider creating Vietnamese language content or at minimum adding hreflang annotations.
**Owner:** @seo-expert to evaluate

### LOW 5: Implement Security Headers
Add `X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy` headers via `vercel.json`. While not direct ranking factors, they contribute to site trustworthiness.
**Owner:** @website-builder

### LOW 6: Add `last-modified` Dates to Blog Posts
Blog posts have dates displayed but not in `<time>` elements with proper datetime attributes. This helps search engines understand content freshness.
**Owner:** @website-builder

### LOW 7: Font Loading Optimization
The Layout uses Google Fonts (Inter + Playfair Display) with `preconnect`. Consider using `font-display: optional` instead of `swap` for better CLS scores, or self-host the fonts for faster loading.
**Owner:** @website-builder

### LOW 8: Add a 404 Page
Verify a custom 404 page exists that guides users back to the site with helpful links.
**Owner:** @website-builder

---

## 6. COMPARISON: WordPress (38/100) vs. Astro (62/100)

| Factor | WordPress (Old) | Astro (New) | Change |
|---|---|---|---|
| **Title Tags** | Generic ("Premier Dental - Home") | Location-targeted ("Premier Dental \| Dentist in Albemarle & Charlotte, NC") | +++ |
| **Meta Descriptions** | Auto-generated, generic | Hand-crafted, keyword-rich, with CTAs | ++ |
| **Schema Markup** | ZERO (no LocalBusiness, no Dentist) | Dentist + FAQPage + MedicalWebPage (in code, partially rendering) | +++ |
| **Page Speed** | WordPress + Elementor bloat | Astro static HTML, minimal JS | +++ |
| **URL Structure** | Flat (everything at root) | Hierarchical (/services/*, /blog/*) | ++ |
| **Internal Linking** | Minimal | FAQ answers link to services | ++ |
| **Blog Architecture** | WordPress categories, 40+ posts | Static generation, 40 posts, related posts | + |
| **Open Graph** | Yoast defaults | Custom per-page with proper images | + |
| **Keywords Meta** | Not present | Present on all Astro pages | + |
| **Before/After Gallery** | Basic image grid | Interactive slider with categories | ++ |
| **Mobile Responsiveness** | Elementor responsive | Tailwind CSS responsive-first | ++ |
| **Sitemap** | Yoast auto-generated (comprehensive) | @astrojs/sitemap (needs verification) | = |
| **robots.txt** | Yoast proper configuration | Simple but correct | = |
| **Location Pages** | /noda exists | None yet | -- |
| **About/Team Page** | /about-us with bios | Section on homepage only | - |
| **Contact Page** | /contacts with form + map | Section on homepage only | - |
| **FAQ Page** | /faqs standalone | Section on homepage only | - |
| **Blog Count** | ~60+ posts (WordPress DB) | 40 posts (migrated) | -- |

### Score Breakdown Comparison

| Category | WordPress | Astro | Delta |
|---|---|---|---|
| On-Page SEO | 42 | 72 | **+30** |
| Technical SEO | 30 | 55 | **+25** |
| Content & E-E-A-T | 45 | 68 | **+23** |
| Local SEO | 35 | 58 | **+23** |
| UX & Conversion | 40 | 52 | **+12** |
| **TOTAL** | **38** | **62** | **+24** |

---

## 7. ACTION PLAN (Prioritized by Impact)

### Phase 1: Emergency Fixes (This Week) -- Estimated Impact: +15-20 points

| # | Task | Owner | Priority | Est. Time |
|---|---|---|---|---|
| 1 | **Complete DNS migration** -- Point premierdentalnc.com entirely to Vercel so the Astro homepage serves at root `/` | @website-builder | P0 | 2-4 hours |
| 2 | **Fix ServiceLayout schema passthrough** -- Add `schema` and `extraSchemas` props to ServiceLayout.astro and update all 6 service pages to pass their schema objects | @website-builder | P0 | 1 hour |
| 3 | **Set up 301 redirects** for ALL old WordPress URLs to new Astro URLs (create a redirect map) | @website-builder | P0 | 3-4 hours |
| 4 | **Add Google Search Console verification** meta tags to Layout.astro | @website-builder | P0 | 15 minutes |
| 5 | **Verify and update robots.txt** -- Ensure Astro robots.txt is served with correct sitemap URL | @website-builder | P0 | 15 minutes |

### Phase 2: Schema & Structured Data (Week 2) -- Estimated Impact: +5-8 points

| # | Task | Owner | Priority | Est. Time |
|---|---|---|---|---|
| 6 | **Add BlogPosting schema** to blog post template `[slug].astro` | @website-builder | P1 | 1 hour |
| 7 | **Add BreadcrumbList schema** to blog posts and service pages | @website-builder | P1 | 1 hour |
| 8 | **Add AggregateRating** to Dentist schema (if Google reviews available) | @website-builder | P1 | 30 min |
| 9 | **Verify FAQPage schema renders** on live homepage after migration | @seo-expert | P1 | 30 min |

### Phase 3: Content & Pages (Weeks 2-3) -- Estimated Impact: +5-10 points

| # | Task | Owner | Priority | Est. Time |
|---|---|---|---|---|
| 10 | **Create /locations/albemarle page** with unique content, map, LocalBusiness schema | @website-builder + @content-creator | P1 | 4 hours |
| 11 | **Create /locations/charlotte page** with unique content, map, LocalBusiness schema | @website-builder + @content-creator | P1 | 4 hours |
| 12 | **Create /about page** with team bios, Person schema for dentists | @website-builder + @content-creator | P1 | 4 hours |
| 13 | **Create /contact page** with form, maps, NAP, hours | @website-builder | P1 | 3 hours |
| 14 | **Migrate missing blog posts** -- Audit WordPress DB vs blogPosts.ts, add missing 20-30 posts | @content-creator + @website-builder | P1 | 6 hours |
| 15 | **Create /faq standalone page** with FAQPage schema | @website-builder | P2 | 2 hours |

### Phase 4: Internal Linking & Content Enhancement (Weeks 3-4) -- Estimated Impact: +3-5 points

| # | Task | Owner | Priority | Est. Time |
|---|---|---|---|---|
| 16 | **Add internal links to service pages** -- Link to relevant blog posts, other services, before/after gallery | @content-creator | P2 | 4 hours |
| 17 | **Expand homepage content** to 500-800 words of crawlable text | @content-creator | P2 | 2 hours |
| 18 | **Audit and fix blog image alt text** -- Remove duplicates, make descriptive | @content-creator | P2 | 3 hours |
| 19 | **Create unique OG images** for each service page | @website-builder | P3 | 2 hours |
| 20 | **Add blog post `<time>` elements** with proper datetime attributes | @website-builder | P3 | 1 hour |

### Phase 5: Technical Polish (Week 4+) -- Estimated Impact: +2-3 points

| # | Task | Owner | Priority | Est. Time |
|---|---|---|---|---|
| 21 | **Add security headers** via vercel.json | @website-builder | P3 | 30 min |
| 22 | **Self-host Google Fonts** for faster loading | @website-builder | P3 | 1 hour |
| 23 | **Create custom 404 page** | @website-builder | P3 | 1 hour |
| 24 | **Submit new sitemap to GSC** and request re-indexing of key pages | @seo-expert | P1 | 30 min |

---

## 8. PROJECTED SCORE AFTER ALL FIXES

| Category | Current | After Phase 1 | After All Phases |
|---|---|---|---|
| On-Page SEO | 72 | 82 | 90 |
| Technical SEO | 55 | 75 | 88 |
| Content & E-E-A-T | 68 | 70 | 85 |
| Local SEO | 58 | 65 | 85 |
| UX & Conversion | 52 | 60 | 78 |
| **TOTAL** | **62** | **73** | **86** |

---

## 9. RECOMMENDED NEXT STEPS

1. **IMMEDIATE (Today):** @website-builder -- Fix the ServiceLayout schema bug. This is a 1-hour fix that affects 6 pages.

2. **IMMEDIATE (Today/Tomorrow):** @website-builder -- Complete the DNS migration so the Astro homepage serves at the root URL. All schema work, title tag improvements, and FAQ internal linking are invisible until this happens.

3. **This Week:** @website-builder -- Create a comprehensive 301 redirect map from every old WordPress URL to the corresponding new Astro URL. This preserves link equity and prevents 404 errors.

4. **This Week:** @seo-expert -- After migration, validate all schemas using Google's Rich Results Test (https://search.google.com/test/rich-results) on the homepage, service pages, and /our-work.

5. **Next Week:** @content-creator -- Begin writing unique content for the two location pages. Each should have 500-800 words of unique, locally-relevant content (nearby landmarks, parking, directions, community involvement).

6. **Next Week:** @website-builder -- Add BlogPosting schema to the blog template and BreadcrumbList schema across the site.

7. **Ongoing:** @seo-expert -- Monitor Google Search Console for indexing errors, 404s, and coverage issues during the migration period. Expect 2-4 weeks for Google to fully re-crawl and re-index the site.

8. **30-Day Check:** @seo-expert -- Re-audit the site after all Phase 1-3 fixes are deployed to measure actual score improvement.

---

## 10. REDIRECT MAP (Required for Migration)

The following old WordPress URLs need 301 redirects to new Astro URLs:

| Old WordPress URL | New Astro URL |
|---|---|
| `/about-us` | `/about` (create) or `/#about` |
| `/contacts` | `/contact` (create) or `/#contact` |
| `/faqs` | `/faq` (create) or `/#faq` |
| `/treatments` | `/#services` |
| `/dentistry` | `/#services` |
| `/noda` | `/locations/charlotte` (create) |
| `/restorative-dentistry` | `/services/restorative-dentistry` |
| `/cosmetic-dentistry` | `/services/cosmetic-dentistry` or `/blog/cosmetic-dentistry` |
| `/invisalign-dentistry` | `/services/invisalign` |
| `/implant-dentistry` | `/services/implant-dentistry` |
| `/same-day-emergency-dentist` | `/services/emergency-dentistry` |
| `/blogs` | `/blog` |
| `/blogs/restorative-dentistry` | `/blog?category=restorative` |
| `/blogs/cosmetic-dentistry` | `/blog?category=cosmetic` |
| `/blogs/implant-dentistry` | `/blog?category=implant` |
| `/blogs/invisalign-dentistry` | `/blog?category=invisalign` |
| `/blogs/emergency-dentistry` | `/blog?category=emergency` |
| `/blogs/preventive-dentistry` | `/blog?category=preventive` |
| `/em-face` | `/#emface` |
| `/emface-treatment` | `/#emface` |
| `/dental-fillings-in-charlotte` | `/blog/dental-fillings-in-charlotte` |
| `/dental-crowns-in-charlotte` | `/blog/dental-crowns-in-charlotte` |
| `/dental-bridges-in-charlotte` | `/blog/dental-bridges-in-charlotte` |
| `/dental-implants-in-charlotte` | `/blog/dental-implants-in-charlotte` |
| `/dentures-in-charlotte` | `/blog/dentures-in-charlotte` |
| `/root-canal-therapy-in-charlotte` | `/blog/root-canal-therapy-in-charlotte` |
| `/full-mouth-restoration-in-charlotte` | `/blog/full-mouth-restoration-in-charlotte` |
| `/inlays-and-onlays-in-charlotte` | `/blog/inlays-and-onlays-in-charlotte` |
| `/restorative-dentistry-materials-in-charlotte` | `/blog/restorative-dentistry-materials-in-charlotte` |
| `/restorative-procedures-for-gum-health` | `/blog/restorative-procedures-for-gum-health` |
| `/teeth-whitening` | `/blog/teeth-whitening` |
| `/dental-veneers-in-charlotte` | `/blog/dental-veneers-in-charlotte` |
| `/cosmetic-dental-crowns` | `/blog/cosmetic-dental-crowns` |
| `/cosmetic-dental-bonding` | `/blog/cosmetic-dental-bonding` |
| `/orthodontics-in-charlotte` | `/blog/orthodontics-in-charlotte` |
| `/inlays-and-onlays-in-cosmetic-dentistry` | `/blog/inlays-and-onlays-in-cosmetic-dentistry` |
| `/types-of-dental-implants-in-charlotte` | `/blog/types-of-dental-implants-in-charlotte` |
| `/implant-procedure-in-charlotte` | `/blog/implant-procedure-in-charlotte` |
| `/implant-materials-in-charlotte` | `/blog/implant-materials-in-charlotte` |
| `/candidate-for-dental-implants-in-charlotte` | `/blog/candidate-for-dental-implants-in-charlotte` |
| `/dental-implants-cost-in-charlotte` | `/blog/dental-implants-cost-in-charlotte` |
| `/alternatives-to-dental-implants` | `/blog/alternatives-to-dental-implants` |
| `/implants-for-special-cases` | `/blog/implants-for-special-cases` |
| `/risks-and-complications-in-charlotte` | `/blog/risks-and-complications-in-charlotte` |
| `/benefits-of-dental-implants` | `/blog/benefits-of-dental-implants` |
| `/post-transplant-care` | `/blog/post-transplant-care` |
| `/overview-of-invisalign-in-charlotte` | `/blog/overview-of-invisalign-in-charlotte` |
| `/invisalign-vs-traditional-braces` | `/blog/invisalign-vs-traditional-braces` |
| `/invisalign-process-in-charlotte` | `/blog/invisalign-process-in-charlotte` |
| `/invisalign-care-and-maintenance` | `/blog/invisalign-care-and-maintenance` |
| `/invisalign-costs-and-financing-options` | `/blog/invisalign-costs-and-financing-options` |
| `/suitability-and-eligibility-in-charlotte` | `/blog/suitability-and-eligibility-in-charlotte` |
| `/common-issues-and-solutions` | `/blog/common-issues-and-solutions` |
| `/invisalign-for-different-age-groups` | `/blog/invisalign-for-different-age-groups` |
| `/invisalign-aftercare-and-retainers` | `/blog/invisalign-aftercare-and-retainers` |
| `/benefits-of-invisalign-in-charlotte` | `/blog/benefits-of-invisalign-in-charlotte` |
| `/top-rated-implant-dentist` | `/services/implant-dentistry` |
| `/trusted-root-canal-dentist-in-charlotte` | `/services/restorative-dentistry` |
| `/implant-dentures-in-noda` | `/services/implant-dentistry` |
| `/tmj-pain-dentist` | `/services/emergency-dentistry` |
| `/category/blogs` | `/blog` |
| `/category/blogs/*` | `/blog` |
| `/author/richtechcenter` | `/blog` |

These redirects should be implemented in `vercel.json`:
```json
{
  "redirects": [
    { "source": "/about-us", "destination": "/about", "permanent": true },
    { "source": "/contacts", "destination": "/contact", "permanent": true },
    { "source": "/restorative-dentistry", "destination": "/services/restorative-dentistry", "permanent": true },
    ...
  ]
}
```

---

## 11. TECHNICAL NOTES

### Sitemap Configuration
- Astro config has `@astrojs/sitemap` installed with `site: 'https://premierdentalnc.com'`
- robots.txt in public/ references `/sitemap-index.xml` (Astro's default output path)
- Verify the generated sitemap includes all blog posts (40 dynamic routes from `[slug].astro`)

### Font Stack
- Headings: Playfair Display (400-700)
- Body: Inter (400-700)
- Both loaded via Google Fonts with preconnect

### Image Hosting
- Images use `/wp-content/uploads/` paths (copied to public/wp-content/)
- This works but the path suggests WordPress origins -- not a ranking factor but worth noting

### Deployment
- Astro static site deployed to Vercel
- vercel.json is currently empty `{}`-- needs redirect rules added

---

*Report generated by Rich Marketing SEO Team. For questions, contact @seo-expert.*
*Next audit scheduled: 30 days after Phase 1 completion.*
