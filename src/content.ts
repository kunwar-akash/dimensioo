export const brand = {
  name: 'Dimensioo',
  tagline: 'Think Bigger. Market Smarter.',
  description: 'A strategy-led creative marketing agency for ambitious brands and creators.',
  url: process.env.NEXT_PUBLIC_SITE_URL || '',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  booking: process.env.NEXT_PUBLIC_BOOKING_URL || '',
}

export const navigation = [
  ['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Our Work', '/work'],
  ['Influencer Network', '/influencers'], ['For Creators', '/creators'], ['Contact', '/contact'],
]

export const services = [
  { slug: 'social-community', name: 'Social & Community', color: '#b398ff', pitch: 'Build a social presence people want to come back to.', challenge: 'When publishing gets busy, the point of view can disappear. We help teams find a consistent voice and a rhythm they can sustain.', includes: ['Social Media Management', 'Community Management', 'Campaign Management'], process: 'Audit the channels, map audience conversations, build a publishing rhythm, and adapt it as real people respond.', outcome: 'A clearer social identity, stronger audience relationships, and a repeatable editorial rhythm.' },
  { slug: 'influencer-talent', name: 'Influencer & Talent', color: '#ff8dbf', pitch: 'Find the creators who can make your story their own.', challenge: 'A large audience means little without relevance. We look at creative fit, audience context and partnership quality before putting a name on a shortlist.', includes: ['Influencer Marketing', 'Influencer and Talent Management', 'Creator Partnerships'], process: 'Define the fit, vet creator work and audiences, agree on creative freedom and usage, and measure the campaign against the brief.', outcome: 'More credible partnerships and content that can work across organic and paid channels.' },
  { slug: 'performance-growth', name: 'Performance & Growth', color: '#8fafff', pitch: 'Make every campaign a chance to learn what moves demand.', challenge: 'When acquisition gets expensive, it is hard to tell whether the audience, message or landing page needs work. We design tests around that question.', includes: ['Performance Marketing', 'Meta Advertising', 'Google Advertising', 'Digital Marketing'], process: 'Check tracking, develop a test plan, launch creative and audience variants, then use the results to guide spend.', outcome: 'A clearer view of acquisition costs and which messages deserve more investment.' },
  { slug: 'content-creative', name: 'Content & Creative', color: '#ffb889', pitch: 'Make ideas people want to watch, share, and remember.', challenge: 'Formats move fast. We help teams make distinctive work that reads naturally in each feed and stays recognizable from one format to the next.', includes: ['Content Creation', 'Video Production', 'Reels and Short-Form Video'], process: 'Agree on the story, develop a visual direction, produce a core asset, and edit versions for each channel.', outcome: 'A useful library of campaign assets and a creative language your team can build on.' },
  { slug: 'branding-strategy', name: 'Branding & Strategy', color: '#d0ed88', pitch: 'Give people a reason to know you and a reason to choose you.', challenge: 'A brand can outgrow its language or look. We turn customer insight and business priorities into a position that holds up across channels.', includes: ['Branding', 'Creative Strategy', 'Public Relations'], process: 'Review the category, surface what makes the business distinct, and translate the position into messaging and design direction.', outcome: 'A recognizable identity and a clearer way to brief and evaluate new work.' },
  { slug: 'digital-experiences', name: 'Digital Experiences', color: '#8ce3ec', pitch: 'Build a digital home that carries the story all the way to action.', challenge: 'Campaign attention can evaporate on a confusing or slow site. We simplify the path from discovery to the action that matters.', includes: ['Website Development', 'Search Engine Optimization', 'Landing Page Strategy'], process: 'Map visitor journeys, prototype key pages, build and test the experience, then review search and conversion signals.', outcome: 'A faster, clearer site with stronger foundations for discoverability and conversion.' },
]

export type Project = {
  slug: string
  name: string
  category: string
  type: string
  cover: string
  alt: string
  challenge: string
  strategy: string
  execution: string
  outcome: string
  gallery?: { src: string; alt: string }[]
  verifiedResults?: string
}

export const projects: Project[] = [
  { slug: 'offbeat', name: 'Offbeat', category: 'Branding', type: 'D2C brand launch', cover: '/assets/offbeat-campaign.webp', alt: 'Lime-green Offbeat sparkling drink can on a matching plinth', challenge: 'Help a new sparkling drink stand out in a category full of wellness language.', strategy: 'Position the drink around a break in routine and turn that idea into a flexible identity for shelves and feeds.', execution: 'A high-voltage lime palette, sharp product photography, and a simple system for flavor and retail variations.', outcome: 'Quick recognition at shelf and a consistent launch identity across packaging and social.' },
  { slug: 'after-hours', name: 'After Hours', category: 'Influencer Marketing', type: 'Creator campaign', cover: '/assets/after-hours-campaign.webp', alt: 'Model in cobalt sunglasses and a blue jacket against a magenta backdrop', challenge: 'Introduce a fashion drop without losing the personal styling that makes creators worth following.', strategy: 'Give creators a common prompt about what they wear after dark, with full room for their own interpretation.', execution: 'Creator-led vertical edits, portrait stills, and a paid amplification plan with usage agreed up front.', outcome: 'A varied set of authentic styling stories and evidence about which creative angles earn attention.' },
  { slug: 'pace-lab', name: 'Pace Lab', category: 'Performance Marketing', type: 'Acquisition campaign', cover: '/assets/project-2.webp', alt: 'Orange running shoes suspended in a warm studio', challenge: 'Find which product benefits resonate with casual runners considering their next shoe.', strategy: 'Compare messaging about comfort, daily consistency and personal progress with the same audience and offer.', execution: 'Three short campaigns with matched landing pages and a clear purchase measurement plan.', outcome: 'Direction on the most persuasive message and a repeatable creative testing framework.' },
  { slug: 'form-and-field', name: 'Form & Field', category: 'Content Creation', type: 'Product editorial', cover: '/assets/project-3.webp', alt: 'Metallic skincare bottle against textured periwinkle rock', challenge: 'Make a minimalist skincare line recognizable without relying on claims or busy packaging.', strategy: 'Create a visual world around the contrast between precision packaging and natural textures.', execution: 'Studio stills, macro motion loops and product-page crops derived from one lighting and material system.', outcome: 'A coherent visual library across storefront, social and launch communications.' },
  { slug: 'open-court', name: 'Open Court', category: 'Social Media', type: 'Community strategy', cover: '/assets/project-4.webp', alt: 'Black-and-white editorial photograph of a basketball athlete', challenge: 'Help a local basketball concept build a community beyond game-day announcements.', strategy: 'Give the feed recurring formats centered on pickup culture, neighborhood voices and practice rituals.', execution: 'An editorial calendar, player-led short films and a repeatable match-day format.', outcome: 'A distinct voice and more opportunities for local players to participate.' },
  { slug: 'clearspace', name: 'Clearspace', category: 'Digital Experiences', type: 'Product website', cover: '/assets/project-5.webp', alt: 'Desktop and phone mockup on a lilac studio set', challenge: 'Explain a productivity tool clearly enough for someone to decide whether to try it.', strategy: 'Structure the site around everyday workflows and simplify the route from feature discovery to trial.', execution: 'A responsive product story, interface close-ups and an accessible landing page design.', outcome: 'Clearer product comprehension and a shorter path to signup.' },
]

export type Profile = {
  name: string; image?: string; platform?: string; category?: string; location?: string;
  audience?: string; engagement?: string; bio?: string; links?: { label: string; url: string }[];
}
export const influencers: Profile[] = []
export const team: Profile[] = []

export const approach = [
  ['Discover', 'Get clear on the business, the audience, and the problem worth solving.'],
  ['Strategize', 'Choose the position, channels, and measures that make sense for the brief.'],
  ['Create', 'Turn the strategy into ideas with a distinct point of view.'],
  ['Launch', 'Coordinate the rollout so the work lands in the right places at the right time.'],
  ['Optimize', 'Study what happened and bring those lessons into the next iteration.'],
]

export const influencerProcess = [
  ['Discover', 'Find creators whose work, audience and values fit the brief.'],
  ['Strategize', 'Agree on the story, platform, deliverables and how success will be measured.'],
  ['Collaborate', 'Support the creators through briefing, production and approvals.'],
  ['Amplify', 'Extend strong content through agreed usage, paid media and owned channels.'],
  ['Measure', 'Review audience response, content performance and business signals.'],
]
