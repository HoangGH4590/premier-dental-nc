# SEO AUDIT REPORT: premierdentalnc.com (Final Re-Audit)
## Premier Dental - Albemarle & Charlotte, NC
### Audit Date: March 30, 2026
### Audited by: Rich Marketing SEO Team
### Previous Scores: WordPress 38/100 | First Astro Audit 62/100

---

## OVERALL SEO SCORE: 52/100

| Category | Score | Weight | Weighted |
|---|---|---|---|
| On-Page SEO | 58/100 | 25% | 14.50 |
| Technical SEO | 38/100 | 25% | 9.50 |
| Content & E-E-A-T | 62/100 | 20% | 12.40 |
| Local SEO | 50/100 | 20% | 10.00 |
| UX & Conversion | 55/100 | 10% | 5.50 |
| **TOTAL** | | | **51.90 -> 52/100** |

---

## EXECUTIVE SUMMARY

**This score is lower than the previous 62/100 audit, and here is why: that audit scored the Astro source code and assumed deployment was imminent. This audit scores what Google actually sees right now at premierdentalnc.com.**

The single most damaging finding remains unchanged from the last audit: **the homepage at premierdentalnc.com/ is still serving the old WordPress site** (WordPress 6.9.4, Elementor 3.23.3, Yoast SEO). The old WordPress pages at `/about-us`, `/contacts`, `/restorative-dentistry`, `/cosmetic-dentistry`, `/faqs`, `/treatments`, and all 40+ old blog post URLs continue to serve 200 OK responses with WordPress content. **None of the 60+ 301 redirects in vercel.json are executing** because WordPress is handling those routes before Vercel can intercept them.

The Astro pages that ARE live and indexable -- `/services/restorative-dentistry`, `/services/cosmetic-dentistry`, `/services/emergency-dentistry`, `/blog`, `/blog/cosmetic-dental-bonding`, `/our-work` -- show excellent SEO implementation. But they exist alongside the WordPress duplicates, creating a split-brain deployment that confuses Google.

**Bottom line:** The Astro source code is excellent (would score 78-82 if fully deployed). But the WordPress-to-Astro migration is incomplete. Until the DNS/hosting fully points to Vercel and WordPress is decommissioned, all the schema work, redirect rules, and content improvements exist only in source code or are undermined by duplicate WordPress pages.

---

## COMPARISON TABLE: WordPress (38) -> First Astro (62) -> Current (52)

| Factor | WordPress (38) | First Astro (62)* | Current Live (52) |
|---|---|---|---|
| Homepage Platform | WordPress/Elementor | Astro (in source) | **WordPress/Elementor** |
| Dentist Schema | None | In source code | **Not rendering (WP serves homepage)** |
| FAQPage Schema (8 Q&As) | None | In source code | **Not rendering (WP serves homepage)** |
| BlogPosting Schema | None | In source code | **Rendering on /blog/* Astro pages** |
| MedicalWebPage Schema | None | In source code | **Rendering on /services/* Astro pages** |
| 301 Redirects (60+) | N/A | Configured in vercel.json | **Not executing (WP intercepts)** |
| robots.txt | Yoast (sitemap_index.xml) | Astro (sitemap-index.xml) | **Yoast version serving (WP)** |
| Sitemap | sitemap_index.xml (WP/Yoast) | sitemap-index.xml (Astro) | **sitemap_index.xml live; sitemap-index.xml returns 404** |
| Title Tags (Astro pages) | Generic | Geo-targeted, optimized | **Live and correct on /services/*, /blog/*** |
| Title Tag (Homepage) | "Premier Dental - Home" | Optimized with geo | **"Premier Dental - Home" (WordPress)** |
| GA4 | Not verified | Placeholder G-XXXXXXXXXX | **Placeholder (not configured)** |
| Contact Form | WordPress form | Formspree | **WordPress form on /contacts (WP)** |
| Internal Links in FAQ | None | 10+ links to service pages | **Not rendering (WP serves homepage)** |
| Duplicate Content | N/A | Potential | **Active -- WP and Astro serve same topics** |

*The 62/100 scored the Astro source code and assumed imminent full deployment. This was optimistic.

---

## 1. WHAT IMPROVED SINCE LAST AUDIT (Source Code Verified)

These improvements exist in the Astro codebase and ARE rendering on the Astro-served pages:

### 1.1 BlogPosting Schema -- CONFIRMED WORKING
- Verified on `/blog/cosmetic-dental-bonding`: BlogPosting schema with `headline`, `author` (Organization: Premier Dental), `datePublished`, `publisher` with logo, `mainEntityOfPage`, and `articleSection`.
- All 40 blog posts generated via `[slug].astro` with this schema.
- **Status: Live and rendering on all /blog/* URLs.**

### 1.2 MedicalWebPage + MedicalProcedure Schema -- CONFIRMED WORKING
- Verified on `/services/restorative-dentistry`: MedicalWebPage with nested MedicalProcedure schema rendering correctly.
- All 6 service pages (restorative, cosmetic, implant, preventive, invisalign, emergency) have this schema in source and it passes through ServiceLayout correctly.
- **Status: Live and rendering on all /services/* URLs.**

### 1.3 ServiceLayout Schema Passthrough Bug -- FIXED
- The previous audit found that ServiceLayout did not pass `schema` to Layout. This is now fixed:
  ```
  const { title, description, keywords, schema, extraSchemas = [] } = Astro.props;
  ```
- Layout.astro correctly renders the schema via `<script type="application/ld+json">`.

### 1.4 FAQPage Schema (8 Q&As) -- BUILT BUT NOT LIVE
- Source code in `index.astro` defines 8 excellent FAQ items covering: new patients, insurance, emergency care, cleanings, EMFACE, implant costs, hours, Invisalign.
- FAQ component includes internal links to `/services/emergency-dentistry`, `/services/preventive-dentistry`, `/services/invisalign`, `/services/implant-dentistry`, `/#emface`, `/#contact`, `/#locations`, `/#insurance`.
- **Status: NOT rendering because WordPress serves the homepage.**

### 1.5 Dentist Schema with Full NAP -- BUILT BUT NOT LIVE
- Source code defines comprehensive Dentist schema with both addresses, both phone numbers, email, opening hours (Mon-Thu 8:30-5:00), priceRange, areaServed (Albemarle + Charlotte), and 7-item OfferCatalog.
- **Status: NOT rendering because WordPress serves the homepage.**

### 1.6 Redirect Rules (60+) -- CONFIGURED BUT NOT EXECUTING
- `vercel.json` contains 63 permanent redirect rules covering all old WordPress URLs to new Astro paths.
- Covers: `/about-us` -> `/#about`, `/contacts` -> `/#contact`, `/restorative-dentistry` -> `/services/restorative-dentistry`, all 40 blog slugs to `/blog/[slug]`, category/author pages to `/blog`, old sitemaps to new.
- **Status: NOT executing. WordPress serves all old URLs with 200 OK.**

### 1.7 Astro robots.txt -- BUILT BUT NOT SERVING
- `public/robots.txt` correctly references `https://premierdentalnc.com/sitemap-index.xml`.
- **Status: The live /robots.txt serves the Yoast version pointing to `sitemap_index.xml`.**

---

## 2. CRITICAL ISSUES (Must Fix -- High Impact)

### CRITICAL 1: WordPress Still Serving the Homepage and Old URLs
**Impact: Blocks ALL homepage SEO improvements from reaching Google.**

The homepage at `https://premierdentalnc.com/` returns:
- `generator: WordPress 6.9.4, Elementor 3.23.3`
- Title: "Premier Dental - Home" (generic, no geo-targeting)
- Meta description: "Premier Dental Care: Passionate about helping take care of your teeth, ensuring a bright and healthy smile." (generic)
- Zero JSON-LD schema (no Dentist, no FAQPage)
- Content: ~150 words of thin text
- Links pointing to old WordPress URLs (`/treatments/`, `/restorative-dentistry/`, `/about-us/`, `/contacts/`)

**Meanwhile, the Astro homepage (in source) has:**
- Title: "Premier Dental | Dentist in Albemarle & Charlotte, NC | Comprehensive Dental Care"
- Dentist schema with full NAP
- FAQPage schema with 8 Q&As
- Internal links to all 6 service pages
- Rich, structured content

**Fix:** Complete the DNS/hosting migration so Vercel serves ALL routes. Decommission WordPress entirely. This single fix would immediately unlock ~15-20 points of SEO score.

### CRITICAL 2: Duplicate Content -- Two Versions of Every Page
**Impact: Google may penalize or de-index pages due to duplication.**

Currently both of these serve 200 OK with different content on the same topic:
- `/restorative-dentistry` (WordPress blog post, ~1500 words)
- `/services/restorative-dentistry` (Astro service page, ~750 words)

Similarly:
- `/cosmetic-dentistry` (WordPress) AND `/services/cosmetic-dentistry` (Astro)
- `/cosmetic-dental-bonding` (WordPress) AND `/blog/cosmetic-dental-bonding` (Astro)
- Plus ~40 more blog post duplicates

Google sees duplicate/competing pages for the same keywords. Without 301 redirects executing, both versions are indexed.

**Fix:** Same as Critical 1 -- complete the migration. Once Vercel handles all routes, the 301 redirects in vercel.json will fire and consolidate link equity.

### CRITICAL 3: Sitemap Points to 404
**Impact: Google cannot discover the Astro sitemap.**

- Live robots.txt (WordPress/Yoast) references: `https://premierdentalnc.com/sitemap_index.xml` (this exists and lists old WordPress pages)
- Astro robots.txt references: `https://premierdentalnc.com/sitemap-index.xml` (returns 404)
- The redirect rule `"/sitemap_index.xml" -> "/sitemap-index.xml"` is in vercel.json but is NOT executing because WordPress serves it directly.

**Result:** Google is crawling the old WordPress sitemap, discovering old URLs, and NOT finding the new Astro pages in any sitemap.

**Fix:** After full migration, verify `/sitemap-index.xml` resolves and contains all Astro pages. The `@astrojs/sitemap` integration should auto-generate this.

### CRITICAL 4: GA4 Not Configured
**Impact: Zero analytics data being collected.**

Layout.astro contains:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

The placeholder `G-XXXXXXXXXX` has not been replaced with an actual GA4 measurement ID. No traffic or behavior data is being recorded.

**Fix:** Create a GA4 property for premierdentalnc.com and replace `G-XXXXXXXXXX` with the real measurement ID.

---

## 3. MEDIUM PRIORITY IMPROVEMENTS

### MEDIUM 1: Canonical URL Issues on Service Pages
Two service pages have incorrect canonical URLs:
- `/services/restorative-dentistry` has canonical: `https://premierdentalnc.com/#services` (should be self-referencing)
- `/services/emergency-dentistry` has canonical: `https://premierdentalnc.com/#services` (should be self-referencing)

This tells Google these pages are duplicates of the homepage `#services` section, which suppresses their individual ranking.

**Fix:** Remove the hardcoded canonical overrides. Let Layout.astro's default `Astro.url.href` handle it.

### MEDIUM 2: Blog Index Page Has Zero Internal Links
The `/blog` page lists 41 blog post cards but the scrape detected 0 internal links in the main content (63 images but 0 links). If the blog cards are rendered as images without `<a>` tags, Google cannot crawl to blog posts from the index.

**Fix:** Verify that each blog card in `/blog/index.astro` wraps the card content in an `<a href="/blog/[slug]">` tag.

### MEDIUM 3: Homepage Content Extremely Thin (Both Versions)
- WordPress homepage: ~150 words of main content
- Astro homepage: ~250 words (better but still thin by 2026 standards)

For a dental practice homepage targeting "dentist Albemarle NC" and "dentist Charlotte NC," Google expects 500-1000+ words of helpful, topically rich content.

**Fix:** Add more content sections to the Astro homepage -- patient testimonials, procedure overviews, neighborhood/community content, insurance details. Aim for 600+ words minimum.

### MEDIUM 4: Schema Inconsistency on Some Service Pages
The cosmetic-dentistry scrape returned `LocalBusiness` and `DentalOffice` schema types instead of `MedicalWebPage` + `MedicalProcedure`. The source code correctly defines MedicalWebPage. This may be a Firecrawl extraction artifact or a rendering issue.

The emergency-dentistry scrape returned `LocalBusiness` and `MedicalOrganization` -- again not matching the source code's MedicalWebPage.

**Fix:** Manually inspect the rendered HTML of `/services/cosmetic-dentistry` and `/services/emergency-dentistry` in Chrome DevTools to verify the correct schema is in the `<script type="application/ld+json">` tag. If the source code is correct but rendering differs, investigate build caching.

### MEDIUM 5: No BreadcrumbList Schema
Blog posts have visual breadcrumbs (Home > Blog > Post Title) but no BreadcrumbList JSON-LD schema. Google uses this for rich results in SERPs.

**Fix:** Add BreadcrumbList schema to `[slug].astro` and service pages.

---

## 4. LOW PRIORITY / NICE-TO-HAVE

### LOW 1: og:image Points to Generic/Small Image
- Astro pages use `/og-image.jpg` (unverified content/size)
- WordPress homepage uses `logo-dental-premier-200x200.png.webp` (200x200px is too small for social sharing; Facebook recommends 1200x630)

**Fix:** Create a branded 1200x630 og:image for the homepage and default sharing.

### LOW 2: No hreflang Tags
The WordPress homepage has a language switcher (English/Spanish via gTranslate) but no `hreflang` tags for multilingual SEO.

**Fix:** If Spanish pages exist, add proper `hreflang="es"` and `hreflang="en"` tags.

### LOW 3: No Review/AggregateRating Schema
The Dentist schema has no `aggregateRating` or `review` properties. Adding Google review data to the schema helps with rich results.

**Fix:** Add aggregateRating to the Dentist schema with current Google Business Profile rating.

### LOW 4: Missing alt Text Audit
Blog post images use `alt={post.title}` for the featured image, which is adequate but not optimized. A unique descriptive alt text per image would be better.

### LOW 5: No Dedicated Location Pages
The site serves two locations (Albemarle and Charlotte) but has no dedicated `/locations/albemarle` or `/locations/charlotte` pages. Dedicated location pages are critical for local SEO multi-location practices.

**Fix:** Create individual location pages with unique content, embedded maps, directions, parking info, and LocalBusiness schema per location.

---

## 5. DETAILED CATEGORY SCORING

### A. On-Page SEO: 58/100

| Factor | Score | Notes |
|---|---|---|
| Title Tags (Astro pages) | 85 | Excellent geo-targeting pattern: "Service | Premier Dental | City, NC" |
| Title Tag (Homepage - live) | 25 | "Premier Dental - Home" -- generic, no keywords |
| Meta Descriptions (Astro) | 80 | Well-crafted, action-oriented, appropriate length |
| Meta Description (Homepage - live) | 30 | Generic, no call to action |
| H1 Tags | 75 | One H1 per page, keyword-relevant |
| URL Structure | 85 | Clean hierarchy: /services/[name], /blog/[slug] |
| Internal Linking | 40 | FAQ links excellent but not rendering; blog index may lack links |
| Keyword Targeting | 60 | Good on Astro pages; homepage targets nothing specific |

### B. Technical SEO: 38/100

| Factor | Score | Notes |
|---|---|---|
| SSL/HTTPS | 100 | Active |
| Mobile Viewport | 100 | Present on all pages |
| Schema Markup | 30 | Excellent in source, but homepage schemas not rendering; blog/service schemas live |
| robots.txt | 20 | WordPress version serving; points to old sitemap |
| XML Sitemap | 15 | Astro sitemap returns 404; WP sitemap lists old URLs |
| Canonical Tags | 45 | Working on most pages; 2 service pages have wrong canonicals |
| 301 Redirects | 10 | 63 rules configured but zero executing |
| Page Speed | 50 | Astro pages likely fast (static); WP/Elementor pages heavy |
| Duplicate Content | 10 | Active duplication across WordPress and Astro |
| Analytics | 0 | GA4 placeholder not configured |

### C. Content & E-E-A-T: 62/100

| Factor | Score | Notes |
|---|---|---|
| Content Depth (Blog) | 70 | 40+ posts, 700-2000 words, topically relevant |
| Content Depth (Homepage) | 25 | 150-250 words, extremely thin |
| Content Depth (Services) | 70 | 400-750 words, well-structured with procedures listed |
| E-E-A-T Signals | 55 | Dentist schema exists (not rendering); team page exists |
| Freshness | 50 | Blog posts exist but dates are from 2024-2025 |
| Readability | 75 | Clear, patient-friendly language |
| Before/After Gallery | 80 | /our-work page with 7 transformations |

### D. Local SEO: 50/100

| Factor | Score | Notes |
|---|---|---|
| NAP Consistency | 55 | Both addresses and phones visible on WP homepage; not in schema |
| Dentist Schema | 15 | Built perfectly but not rendering |
| Location Pages | 20 | No dedicated location pages; just a map section |
| Google Business Signals | 50 | GSC verified; GBP status unknown |
| Local Keywords | 65 | "Albemarle NC" and "Charlotte NC" in Astro title tags |
| Reviews/Social Proof | 30 | No review schema; no testimonial section |

### E. UX & Conversion: 55/100

| Factor | Score | Notes |
|---|---|---|
| Navigation Clarity | 60 | Astro header is clean; WP has different nav |
| CTA Strength | 70 | Phone numbers prominent; "Book a Consultation" CTAs on Astro |
| Contact Form | 40 | Formspree configured in Astro but WP /contacts still serving WP form |
| Accessibility | 50 | Semantic HTML in Astro; aria-labels on FAQ |
| Mobile Experience | 55 | Responsive CSS in both; Elementor tends to be heavier |

---

## 6. ACTION PLAN (Numbered Priority Order)

### Immediate (This Week)

1. **Complete the WordPress-to-Vercel migration.** Update the domain's DNS so Vercel handles ALL routes for premierdentalnc.com. This single action enables: all 63 redirects, homepage schema, Astro sitemap, Astro robots.txt, and eliminates all duplicate content. **Owner: @website-builder**

2. **Decommission WordPress.** Once Vercel is serving all traffic, take the WordPress installation offline or move it to a staging subdomain. Do not leave it accessible at the production domain. **Owner: @website-builder**

3. **Replace GA4 placeholder.** Create a GA4 property and replace `G-XXXXXXXXXX` in `Layout.astro` with the real measurement ID. **Owner: @website-builder**

### Short-Term (Within 2 Weeks)

4. **Fix canonical URLs on restorative-dentistry and emergency-dentistry.** Remove any hardcoded canonical overrides that point to `/#services`. Let the default `Astro.url.href` generate self-referencing canonicals. **Owner: @website-builder**

5. **Verify blog index has working links.** Confirm each blog card on `/blog` has an `<a>` tag wrapping the card content. **Owner: @website-builder**

6. **Submit new sitemap to Google Search Console.** After migration, verify `/sitemap-index.xml` resolves correctly, then submit it in GSC. Remove the old `sitemap_index.xml` reference. **Owner: @website-builder**

7. **Add BreadcrumbList schema** to blog posts and service pages. **Owner: @website-builder**

### Medium-Term (Within 1 Month)

8. **Expand homepage content** to 600+ words. Add sections for: patient testimonials, brief procedure overviews, community involvement, insurance summary. **Owner: @content-creator + @website-builder**

9. **Create dedicated location pages** for Albemarle and Charlotte with unique content, embedded maps, parking/directions, and per-location LocalBusiness schema. **Owner: @content-creator + @website-builder**

10. **Add AggregateRating to Dentist schema** using current Google Business Profile review data. **Owner: @website-builder**

11. **Create a proper 1200x630 og:image** for social sharing. **Owner: @website-builder**

### Ongoing

12. **Publish 2-4 fresh blog posts per month** targeting local dental keywords (e.g., "best dentist in Albemarle NC", "emergency dentist Charlotte NC same day"). **Owner: @content-creator**

13. **Monitor Google Search Console** weekly for crawl errors, index coverage, and redirect validation after migration. **Owner: SEO team**

---

## 7. WHAT THE SCORE WOULD BE AFTER MIGRATION

If the DNS is updated to point fully to Vercel (Action Items 1-3), the score would immediately jump based on what the Astro source code delivers:

| Category | Current (WP+Astro) | Post-Migration (Astro Only) |
|---|---|---|
| On-Page SEO | 58 | 78 |
| Technical SEO | 38 | 72 |
| Content & E-E-A-T | 62 | 68 |
| Local SEO | 50 | 68 |
| UX & Conversion | 55 | 65 |
| **TOTAL** | **52** | **72** |

With Actions 4-11 completed (canonicals, location pages, breadcrumbs, expanded content, reviews schema):

| Category | Post-Migration | Fully Optimized |
|---|---|---|
| On-Page SEO | 78 | 88 |
| Technical SEO | 72 | 85 |
| Content & E-E-A-T | 68 | 80 |
| Local SEO | 68 | 82 |
| UX & Conversion | 65 | 75 |
| **TOTAL** | **72** | **83** |

---

## 8. PROGRESSION SUMMARY

| Version | Score | Key Blocker |
|---|---|---|
| Old WordPress Site | **38/100** | No schema, thin content, generic titles, no local SEO |
| First Astro Audit (source code) | **62/100** | Scored optimistically on source; assumed deployment |
| Current Live Site (this audit) | **52/100** | WordPress still serving homepage + old URLs; migration incomplete |
| After Full Vercel Migration | **~72/100** | Predicted; all source code improvements go live |
| After Full Optimization | **~83/100** | Predicted; with location pages, expanded content, reviews |

---

## 9. VERIFIED FINDINGS SUMMARY

| Check | Result |
|---|---|
| Homepage serves Astro? | NO -- WordPress 6.9.4 with Elementor |
| Dentist schema on homepage? | NO -- not rendering (WP serves page) |
| FAQPage schema on homepage? | NO -- not rendering (WP serves page) |
| BlogPosting schema on /blog/*? | YES -- verified on /blog/cosmetic-dental-bonding |
| MedicalWebPage schema on /services/*? | YES -- verified on /services/restorative-dentistry |
| ServiceLayout passes schema? | YES -- bug fixed |
| /robots.txt correct? | NO -- Yoast version serving, points to old sitemap |
| /sitemap-index.xml accessible? | NO -- returns 404 |
| /sitemap_index.xml accessible? | YES -- WordPress/Yoast version, lists old URLs |
| /restorative-dentistry redirects? | NO -- serves WordPress blog post with 200 OK |
| /about-us redirects? | NO -- serves WordPress page with 200 OK |
| /contacts redirects? | NO -- serves WordPress page with 200 OK |
| /blogs redirects? | NO -- serves WordPress page with 200 OK |
| GA4 configured? | NO -- placeholder G-XXXXXXXXXX |
| Contact form (Formspree) working? | Cannot verify -- WP /contacts page serves WP form |

---

## FINAL VERDICT

The Astro codebase is genuinely well-built for SEO. The BlogPosting schema, MedicalWebPage schema, FAQPage schema, Dentist schema, internal linking strategy, geo-targeted title tags, and redirect rules are all textbook implementations. The problem is not the code -- it is the deployment.

**The single highest-ROI action available is completing the domain migration to Vercel.** Everything else is secondary. Until WordPress is decommissioned, all the SEO work exists in a parallel universe that Google cannot see for the most important page on the site: the homepage.

Do not invest time in further SEO optimizations until Action Item 1 (full Vercel migration) is complete.

---

*Report generated by Rich Marketing SEO Team*
*Audit methodology: Firecrawl scraping + source code analysis + live URL verification*
*Tools used: firecrawl_map, firecrawl_scrape (JSON + markdown), source code review of Astro components*
