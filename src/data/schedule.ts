export type ScheduleType = 'CONCEPT PHOTO' | 'PRE-ORDER' | 'ALBUM PREVIEW' | 'PROMOTION' | 'COMEBACK';

export interface ScheduleEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD for ranges
  time?: string;
  description: string;
  type: ScheduleType;
}

export const PLAVE_SCHEDULE: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Concept Film',
    date: '2026-03-22',
    description: 'The first glimpse into the world of CALIGO. A cinematic experience introducing the 4th mini album theme.',
    type: 'CONCEPT PHOTO'
  },
  {
    id: '2',
    title: 'Pre-order',
    date: '2026-03-24',
    description: 'Official pre-orders begin for PLAVE 4th Mini Album [CALIGO]. Check your favorite retailers for exclusive benefits.',
    type: 'PRE-ORDER'
  },
  {
    id: '3',
    title: 'Concept Photo A',
    date: '2026-03-24',
    endDate: '2026-03-25',
    description: 'First set of concept photos showcasing the members in the unique CALIGO aesthetic.',
    type: 'CONCEPT PHOTO'
  },
  {
    id: '4',
    title: 'Visual Sampler A',
    date: '2026-03-27',
    description: 'Individual and group visual samplers highlighting the members\' transformation for this comeback.',
    type: 'CONCEPT PHOTO'
  },
  {
    id: '5',
    title: 'Concept Photo B',
    date: '2026-03-30',
    endDate: '2026-03-31',
    description: 'Second set of concept photos revealing a different side of the CALIGO concept.',
    type: 'CONCEPT PHOTO'
  },
  {
    id: '6',
    title: 'Visual Sampler B',
    date: '2026-04-02',
    description: 'The second visual sampler series, further expanding the narrative of the new album.',
    type: 'CONCEPT PHOTO'
  },
  {
    id: '7',
    title: 'Track List',
    date: '2026-04-06',
    description: 'Full tracklist reveal for the 4th Mini Album [CALIGO]. Discover the titles and credits for the new songs.',
    type: 'ALBUM PREVIEW'
  },
  {
    id: '8',
    title: 'Physical Album Preview',
    date: '2026-04-07',
    description: 'A detailed look at the physical album packaging, inclusions, and design.',
    type: 'ALBUM PREVIEW'
  },
  {
    id: '9',
    title: 'Highlight Medley',
    date: '2026-04-08',
    description: 'Listen to snippets of all the tracks included in the CALIGO mini album.',
    type: 'ALBUM PREVIEW'
  },
  {
    id: '10',
    title: 'M/V Teaser',
    date: '2026-04-10',
    description: 'Official music video teaser for the title track. High-energy visuals and a taste of the choreography.',
    type: 'PROMOTION'
  },
  {
    id: '11',
    title: "'Caligo Pt.2' M/V & Digital Release",
    date: '2026-04-13',
    time: '6PM (KST)',
    description: 'The official music video and digital tracks are released worldwide. Join the premiere on YouTube!',
    type: 'COMEBACK'
  },
  {
    id: '12',
    title: "'Caligo Pt.2' Album Release",
    date: '2026-04-14',
    description: 'Physical album release and official start of promotions for CALIGO Pt.2.',
    type: 'COMEBACK'
  }
];
