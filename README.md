# Educational Insights Hub

Here's the updated prompt with those two additions folded in — full version so you can just copy-paste the whole thing:

Create a professional, editorial-style website called "The Venugopal Bere Educational Review" — an academic/educational review publication site with the tagline "Research. Policy. Leadership. Practice."

BRAND & DESIGN
- Background: Black as the primary/dominant background color across the site (hero section, page backgrounds, footer, nav bar). Use ash/light grey only for contrast elements — content cards, alternating sections, text blocks — so copy stays readable against the black. Deep red for accents, buttons, links, hover states, and highlights. Avoid pure white backgrounds; where a light surface is needed for readability (e.g. long-form bio text), use an off-white/ash tone rather than stark white.
- Style: Sophisticated, editorial, journal/magazine-like — a cross between a university press site and a modern digital publication, with a dark, premium, gallery-like feel from the black backdrop. Elegant serif fonts for headings (Playfair Display or Merriweather) paired with a clean sans-serif for body text (Inter or Lato), light/ash tones on dark backgrounds and dark tones on light card backgrounds.
- Use a crest/emblem-style logo mark (book + torch motif) in red/ash next to the site title in the nav.
- Subtle scroll animations, smooth hover transitions on cards/buttons (red glow/underline on hover), clean grid layout.
- Ensure strong contrast and accessibility (WCAG-friendly) between text and black background — no low-contrast dark-grey-on-black text.

RESPONSIVENESS & DEVICE COMPATIBILITY
- Fully responsive and pixel-tested across all breakpoints: mobile (320–480px), tablet (481–1024px), laptop/desktop (1025–1440px), and large/4K screens.
- Mobile-first build: collapsible hamburger navigation menu on mobile/tablet, touch-friendly tap targets, no horizontal scroll, images and embeds (Jotform, YouTube, Maps) that scale fluidly within their containers.
- Test layout integrity across common browsers (Chrome, Safari, Edge, Firefox) and both iOS/Android devices.
- Typography scales fluidly (responsive font sizing) rather than breaking or overflowing on smaller screens.
- Sticky nav bar should adapt to a compact mobile version without losing access to search, menu, and logo.

PAGES & CONTENT

1. Home
   - Hero section with site title, tagline, and CTA button to view the Current Issue.
   - Featured/highlighted articles section (card layout).
   - "About" teaser section linking to the About page.
   - Embedded YouTube video section — e.g., "Watch: Introduction to the Bere Professional Learning Framework" or a welcome message video, with a responsive embedded YouTube player (placeholder video ID that I can swap later).
   - Newsletter signup section.

2. About the Author
   - Two-column layout: left sidebar with author photo, credential badges, and social/QR link block; right side with full bio.
   - Name: Venugopal Bere
   - Titles: Academic Director | Teacher Educator | CBSE Resource Person | Educational Leadership Practitioner
   - Section heading: "Bridging Educational Research with School Leadership and Classroom Practice"
   - Bio copy (use/adapt this text):
     "Venugopal Bere is an educational leader with more than three decades of experience in school education, teacher development, academic leadership, and instructional improvement. Throughout his professional journey as a teacher, principal, academic administrator, and teacher educator, he has remained committed to strengthening the quality of teaching and learning through evidence-informed educational practice.
     He currently serves as Academic Director, providing academic leadership across multiple school campuses, working closely with principals, coordinators, and teachers to enhance instructional quality, promote competency-based education, strengthen assessment practices, and cultivate professional learning cultures aligned with the vision of NEP 2020 and NCF-SE 2023.
     As a CBSE Resource Person, he has facilitated capacity-building programmes for school leaders and teachers on instructional leadership, learning outcomes, competency-based education, assessment reform, cyber safety, digital citizenship, and teacher professional development.
     A strong advocate of lifelong learning, he believes sustainable school improvement begins with the continuous professional growth of educators."
   - Three-principle icon row: "Evidence should inform educational practice" / "Leadership should develop people before programmes" / "Professional learning should ultimately improve student learning."
   - Paragraph introducing the "Bere Professional Learning Framework" as a practice-informed conceptual framework integrating research, policy, leadership, and classroom practice.
   - "Professional Interests" two-column bullet list: Teacher Professional Development, Instructional Leadership, Competency-Based Education, Assessment for Learning, School Improvement & Organisational Learning, Professional Learning Communities, Artificial Intelligence in Education, Future-Ready School Transformation, Educational Policy Implementation, Leadership Mentoring & Capacity Building.
   - Closing paragraph on his purpose for founding The Venugopal Bere Educational Review as a platform where research, policy, leadership, and practice converge.
   - Pull-quote box, "Professional Philosophy": "Educational excellence is not achieved through isolated initiatives. It is built when schools create cultures where teachers continue to learn, leaders continue to support, and students continue to thrive." — styled with a signature graphic and name/title credit.
   - Stat/credential list in sidebar: 30+ Years in Education, Academic Director, CBSE Resource Person, Teacher Educator, Educational Leadership Practitioner.
   - "Connect With Me" box with LinkedIn QR code placeholder and link (www.linkedin.com/in/bere-venu-gopal-lordven111).
   - Footer band tagline: "Research • Reflect • Lead • Transform — Building a Culture of Continuous Professional Learning."

3. Current Issue
   - Featured layout showcasing the latest issue's articles (title, summary, author, "Read More" links), including a feature on the Bere Professional Learning Framework.
   - Filter/tag system by topic.

4. Publications
   - Archive/grid of past publications and issues with search and filter by year/category.
   - Downloadable PDF links (placeholder).

5. Educational Frameworks
   - Structured layout presenting educational frameworks/models, prominently featuring the "Bere Professional Learning Framework" with description, diagram placeholder, and its three core principles.
   - Comparison cards for other referenced frameworks (NEP 2020, NCF-SE 2023 alignment).

6. Resources for School Leaders
   - Resource library: downloadable guides, toolkits, articles, links — organized by category (Instructional Leadership, Assessment Reform, Digital Citizenship & Cyber Safety, Teacher Professional Development, Competency-Based Education).
   - Include an embedded YouTube playlist or video section for training/workshop clips (responsive embed, placeholder video/playlist ID).

7. Contact
   - Contact form embedded via Jotform — placeholder div with id="jotform-contact" for me to paste the embed code into.
   - Address, email, and social icons — include LinkedIn and YouTube channel icon/link.
   - Google Map embed placeholder.

FEATURES
- Sticky responsive navigation bar with all 7 pages and crest logo + site title, collapsing to a hamburger menu on mobile/tablet.
- Footer with sitemap links, social icons (LinkedIn, YouTube prioritized), copyright, newsletter signup, and the "Research • Reflect • Lead • Transform" tagline band.
- Floating chatbot widget (bottom-right) — expandable chat bubble UI for visitor Q&A, built as a simple component I can later connect to an AI backend. Should reposition/resize appropriately on mobile so it doesn't block content.
- Jotform embed placeholders: Contact page (inquiries) and optionally Publications/Current Issue page ("Submit an Article" form) — clearly labeled divs with unique IDs, responsive width.
- YouTube integration: embedded responsive video player(s) using placeholder video IDs, plus a YouTube channel link/icon in header or footer.
- SEO-friendly titles and meta descriptions per page.
- Smooth scroll navigation and "back to top" button.
- Search bar in header for articles/publications, accessible on mobile as an expandable icon.

Make the overall look professional, credible, and academic, while still feeling modern, visually engaging, and seamless on any device.


Once the site's generated, you'll just need to drop in your actual Jotform embed codes, real YouTube video/playlist IDs, and your channel URL.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bere-review-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7e916aaf-1cb1-4206-9a5c-d93bb56d9a22).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
