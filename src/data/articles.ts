// Central content store for every article that appears in "Current Issue".
// Add a new article by adding an object here — a page at /articles/<slug>
// is created automatically, and it will also show up in the Current Issue
// grid if you list it in ARTICLES below.
//
// pdfUrl is optional — only set it if you also want a "Download PDF" button
// on the article page (e.g. for a scanned/typeset version of the same essay).
//
// These four entries are the real, published pieces of Volume 1 — the
// full journal issue, the editorial, the foreword, and the leader's
// toolkit. There are no other essays yet; add them here as they're written.

const STORAGE_BASE = "https://zcgjgcncubxujgwtbkqo.supabase.co/storage/v1/object/public/publications";

export interface Article {
  slug: string;
  tag: string;
  featured?: boolean;
  title: string;
  shortTitle?: string; // Shorter title used on teaser cards (Home, Current Issue grid); falls back to title.
  author: string;
  authorRole?: string;
  date: string; // Display date, e.g. "15 January 2026"
  volume: string; // e.g. "Vol. 1, Issue 1 (2026)"
  readTime: string;
  excerpt: string;
  body: string[]; // one string per paragraph
  pdfUrl?: string;
  references?: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: "volume-1",
    tag: "Journal Issue",
    featured: true,
    title: "Volume 1, Issue 1 (2026): Teacher Professional Development — The Most Powerful Investment a School Can Make",
    shortTitle: "Volume 1, Issue 1 (2026)",
    author: "Venugopal Bere",
    authorRole: "Founder & Editor",
    date: "January 2026",
    volume: "Vol. 1, Issue 1 (2026)",
    readTime: "6 min read",
    excerpt:
      "What happens after a teacher attends a training programme? The inaugural issue explores how schools can transform teacher professional development from isolated training events into a culture of continuous professional learning.",
    body: [
      "What happens after a teacher attends a training programme? Does classroom practice change? Do students experience better learning? Does the school learn from the evidence? Or does professional development end with attendance, feedback, and a certificate?",
      "Volume 1 of The Venugopal Bere Educational Review explores one of the most consequential questions in contemporary school education: how can schools transform teacher professional development from isolated training events into a culture of continuous professional learning?",
      "Drawing upon educational research, India's evolving policy context, and school-leadership practice, the volume explores the relationship between teacher learning, classroom practice, instructional leadership, professional collaboration, reflective practice, student-learning evidence, and continuous school improvement.",
      "Inside this volume: Research Foundations, on what major research perspectives tell us about effective teacher professional learning; From Policy to Practice, connecting NEP 2020 and NCF-SE 2023 with everyday school practice; Leadership in Action, on moving from administrative supervision towards instructional leadership and coaching; The Bere Professional Learning Framework, an integrated eight-stage framework for connecting teacher development with continuous school improvement; From Framework to Action, with practical tools, reflection questions, implementation strategies, and a 90-day improvement approach; and Research to Practice, turning educational evidence into questions and actions that schools can actually use.",
      "This issue is written for the educator who asks: how can we make professional development actually change classroom practice? How can classroom observation become professional learning? How can teachers learn more effectively from one another? How can school leaders build collective professional capacity? How can we connect teacher development with evidence of student learning? How can a school become an organisation that continually learns?",
      "\u201cThe most important investment a school can make is not simply in what teachers have. It is in what teachers are continually becoming.\u201d",
    ],
    pdfUrl: `${STORAGE_BASE}/volume-1.pdf`,
  },
  {
    slug: "editorial",
    tag: "Editorial",
    title: "From the Editor: Why The Venugopal Bere Educational Review?",
    shortTitle: "From the Editor",
    author: "Venugopal Bere",
    authorRole: "Founder & Editor",
    date: "January 2026",
    volume: "Vol. 1, Issue 1 (2026)",
    readTime: "6 min read",
    excerpt:
      "Bridging educational research with school leadership and classroom practice — and what this publication is, and is not.",
    body: [
      "Education has always been a profession of hope. Every day, millions of teachers enter classrooms believing that today's lesson, conversation, or encouragement may shape a learner's future. Yet teaching has never been more complex than it is today. Rapid advances in artificial intelligence, shifting workforce expectations, growing diversity in classrooms, and evolving understandings of how people learn are transforming education at an unprecedented pace.",
      "In such a landscape, educators cannot rely solely on experience or tradition. Equally, they cannot depend on policy documents or research papers alone. Sustainable improvement emerges when research informs practice, leadership nurtures professional growth, and teachers continually refine their craft. This conviction inspired the creation of The Venugopal Bere Educational Review.",
      "The purpose of this publication is not simply to discuss educational ideas. It is to interpret educational research through the lens of school leadership and classroom practice, making evidence accessible, relevant, and actionable for teachers, principals, academic leaders, teacher educators, and school management teams.",
      "Throughout more than three decades in education — as a teacher, principal, academic leader, and CBSE Resource Person — I have learned that lasting school improvement rarely begins with infrastructure, technology, or policy. These are important enablers, but they do not, by themselves, transform learning. Transformation begins when teachers grow professionally. The quality of a school's learning experiences is inseparable from the quality of its teachers' professional learning.",
      "This publication therefore seeks to explore educational questions that matter most to contemporary schools: What does international research tell us about effective teaching and learning? How do national reforms such as NEP 2020 and NCF-SE 2023 reshape educational practice? What leadership approaches cultivate professional learning cultures? How can schools translate educational theory into sustainable classroom improvement?",
      "Rather than presenting isolated opinions, each issue brings together four complementary perspectives: Research, examining what evidence from leading educational scholars tells us; Policy, interpreting the implications of national educational reforms; Leadership, reflecting on lessons from professional practice; and Application, translating evidence into practical strategies for schools.",
      "It is important to clarify what this publication is — and what it is not. It is not an academic journal. Nor is it a collection of motivational essays. Instead, it is an evidence-informed professional review designed to bridge the often-observed gap between educational research and everyday school leadership. My hope is that readers will discover not only new ideas but also practical approaches they can implement within their own educational contexts.",
      "One of the distinctive features of this review is the inclusion of original conceptual frameworks developed from professional experience and interpreted in light of established educational research. These frameworks are offered as practical tools for reflection and adaptation rather than universal prescriptions. Schools differ in their contexts, challenges, and aspirations, and professional judgement will always remain central to educational leadership.",
      "As this publication evolves, I hope it becomes more than a series of articles. I hope it becomes a platform for thoughtful dialogue among educators who share a commitment to improving teaching, strengthening leadership, and enriching student learning. Because educational transformation is not achieved when research is published. It is achieved when research changes practice.",
      "\u201cEducational research achieves its highest purpose only when it influences the decisions teachers make, the cultures leaders build, and the opportunities learners experience.\u201d",
    ],
    pdfUrl: `${STORAGE_BASE}/editorial.pdf`,
  },
  {
    slug: "foreword",
    tag: "Foreword",
    title: "Foreword: Building Better Schools Begins with Building Better Educators",
    shortTitle: "Foreword",
    author: "Venugopal Bere",
    date: "January 2026",
    volume: "Vol. 1, Issue 1 (2026)",
    readTime: "7 min read",
    excerpt:
      "Students experience education through their teachers — why teacher professional development is the most powerful investment a school can make.",
    body: [
      "Every school aspires to provide meaningful learning experiences for its students. New curricula are introduced, technology is upgraded, infrastructure is enhanced, and innovative programmes are launched with the hope of improving educational quality. Yet one enduring reality continues to shape every successful school: students experience education through their teachers.",
      "No curriculum teaches itself. No policy implements itself. No technology inspires a learner on its own. Educational transformation ultimately depends on the professional knowledge, judgement, commitment, and continuous growth of educators. This is why the theme of our inaugural issue — Teacher Professional Development: The Most Powerful Investment a School Can Make — is both timely and fundamental.",
      "Across the world, educational systems are responding to unprecedented social, technological, and economic change. Artificial Intelligence is transforming the nature of work. New careers continue to emerge. Employers increasingly value creativity, collaboration, critical thinking, adaptability, and ethical decision-making alongside disciplinary knowledge. Schools are therefore expected to prepare learners not only for examinations, but also for an uncertain and rapidly changing future.",
      "India has embraced this vision through the National Education Policy (NEP) 2020 and the National Curriculum Framework for School Education (NCF-SE 2023). These reforms call for learner-centred pedagogy, competency-based assessment, experiential learning, interdisciplinary thinking, and inclusive classrooms. Such aspirations cannot be realised without teachers who themselves continue to learn.",
      "Professional development is therefore not a supplementary activity added to the school calendar. It is a strategic process through which schools strengthen instructional quality, foster innovation, and sustain continuous improvement. This review has been written with that purpose in mind — bringing together educational research, national policy, leadership experience, and practical strategies for educators who wish to strengthen teaching and learning within their own institutions.",
      "Rather than reading the review as a continuous article, you may find it helpful to approach it as a working document. As you read each section, consider: Which ideas are already evident in my school? Which practices require further strengthening? Which recommendations could realistically be implemented during the coming academic year? How will we know whether these changes improve student learning?",
      "Educational research becomes valuable only when it informs professional decision-making. Leadership becomes meaningful only when it creates conditions in which teachers flourish. Professional development becomes transformative only when it changes what happens inside classrooms every day.",
      "Every meaningful educational journey begins with a single decision to learn. It is my sincere hope that this publication encourages thoughtful conversations within schools, inspires reflective practice among educators, and contributes — however modestly — to building stronger professional learning cultures.",
      "The guiding philosophy of this publication: Research should inform practice. Practice should enrich research. Leadership should connect the two.",
    ],
    pdfUrl: `${STORAGE_BASE}/foreword.pdf`,
  },
  {
    slug: "leaders-toolkit",
    tag: "Leader's Toolkit",
    title: "The Leader's Toolkit: Ten Powerful Coaching Questions for Post-Observation Conferences",
    shortTitle: "The Leader's Toolkit",
    author: "Venugopal Bere",
    authorRole: "Academic Director & Teacher Educator",
    date: "January 2026",
    volume: "Vol. 1, Issue 1 (2026)",
    readTime: "9 min read",
    excerpt:
      "Moving from evaluation to professional growth — ten coaching questions, a conversation model, and the Bere Coaching Compass for post-observation conferences.",
    body: [
      "These coaching questions are designed to transform post-observation conferences from performance reviews into meaningful professional learning conversations. They encourage teacher reflection, instructional refinement, and collaborative problem-solving.",
      "1. Looking Back — What aspects of today's lesson went particularly well, and what evidence leads you to that conclusion? This begins with reflection on strengths, builds teacher confidence, and anchors the conversation in evidence rather than opinion.",
      "2. Student Learning — What evidence did you observe that students understood the intended learning outcomes? Look for student responses, classroom discussions, assessment evidence, student work, exit tickets, and demonstrations of learning.",
      "3. Learner Engagement — Which students were most actively engaged, and which students may have needed additional support? Why do you think that happened? This question shifts attention from teaching performance to learner participation.",
      "4. Instructional Decisions — Which instructional strategy had the greatest impact on student learning during this lesson? Possible areas include questioning, cooperative learning, demonstration, discussion, activity-based learning, and technology integration.",
      "5. Unexpected Moments — Was there any moment during the lesson that surprised you? What did you learn from it? Powerful coaching often begins with curiosity rather than judgement.",
      "6. Differentiation — How effectively did today's lesson meet the needs of learners with different abilities, interests, or learning profiles? This encourages reflection on inclusion, differentiation, student voice, and equity.",
      "7. Assessment for Learning — How did you check for understanding during the lesson, and what did that information tell you? Discussion may include formative assessment, questioning, observation, peer assessment, self-assessment, and feedback.",
      "8. Professional Reflection — If you were to teach this lesson again tomorrow, what would you keep exactly the same, and what would you change? One of the strongest reflective questions, because it naturally leads to improvement planning.",
      "9. Professional Growth — What professional learning or additional support would help you strengthen this aspect of your teaching? Possible support includes coaching, peer observation, a demonstration lesson, collaborative planning, a workshop, reading, or online learning.",
      "10. Next Steps — What is one specific instructional goal you would like to focus on before our next classroom observation? Every coaching conversation should conclude with one clear, achievable improvement goal.",
      "The Coaching Conversation Model moves through eight stages: celebrate success, explore evidence, analyse student learning, reflect together, identify one priority, plan practical actions, provide ongoing support, and observe again.",
      "Effective post-observation conferences begin with teacher reflection before leader feedback, focus on student learning rather than teacher performance, use evidence instead of assumptions, celebrate strengths while identifying opportunities for growth, encourage professional dialogue rather than one-way evaluation, conclude with one achievable action step, and include follow-up coaching and support.",
      "A few reframes are worth practising. Instead of \u201cWhy didn't you finish the lesson?\u201d ask \u201cWhat factors influenced the pacing of the lesson, and how might we adjust it next time?\u201d Instead of \u201cStudents were not listening,\u201d ask \u201cAt which points did students appear most engaged, and what instructional moves contributed to that?\u201d Instead of \u201cYour questioning was weak,\u201d ask \u201cWhich questions generated the richest student thinking, and how might we build on those?\u201d Instead of \u201cYou need to improve classroom management,\u201d ask \u201cWhat routines or strategies might increase student participation while maintaining a positive learning environment?\u201d",
      "The Bere Coaching Compass balances five dimensions in every coaching conversation: Purpose (was the intended learning clear?), Evidence (what did students demonstrate?), Reflection (what did we learn from today's lesson?), Growth (what is the next improvement goal?), and Support (how will leadership help achieve it?).",
      "\u201cThe quality of post-observation conversations often determines whether classroom observation becomes a source of anxiety or a catalyst for professional growth. Great instructional leaders ask questions that invite reflection, encourage ownership, and strengthen teachers' confidence to improve.\u201d",
    ],
    references: [
      "Knight, J. (2007). Instructional Coaching: A Partnership Approach to Improving Instruction. Corwin Press.",
    ],
    pdfUrl: `${STORAGE_BASE}/leaders-toolkit.pdf`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getFeaturedArticle(): Article {
  return ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
}

// Builds an APA-style recommended citation from an article's metadata.
export function formatCitation(article: Article): string {
  const year = article.volume.match(/\((\d{4})\)/)?.[1] ?? new Date().getFullYear();
  return `${article.author}. (${year}). ${article.title}. The Venugopal Bere Educational Review, ${article.volume.replace(/\s*\(\d{4}\)/, "")}.`;
}
