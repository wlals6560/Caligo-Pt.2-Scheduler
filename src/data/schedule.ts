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
    "id": "em64nyne4",
    "title": "'Caligo Pt.2' Prologue",
    "date": "2026-03-19",
    "description": "https://www.youtube.com/watch?v=FfpJ1CGG-ZE",
    "type": "CONCEPT PHOTO"
  },
  {
    "id": "9p0tforx2",
    "title": "Port 502: Save Asterum",
    "date": "2026-03-20",
    "description": "https://port502.dev/",
    "type": "CONCEPT PHOTO"
  },
  {
    "id": "1",
    "title": "Concept Film",
    "date": "2026-03-22",
    "description": "https://www.youtube.com/watch?v=V6X1CQ20o1k",
    "type": "CONCEPT PHOTO"
  },
  {
    "id": "2",
    "title": "Pre-order",
    "date": "2026-03-24",
    "description": "Coming Soon",
    "type": "PRE-ORDER"
  },
  {
    "id": "3",
    "title": "Concept Photo A",
    "date": "2026-03-24",
    "endDate": "2026-03-25",
    "description": "Coming Soon",
    "type": "CONCEPT PHOTO"
  },
  {
    "id": "4",
    "title": "Visual Sampler A",
    "date": "2026-03-27",
    "description": "Coming Soon",
    "type": "CONCEPT PHOTO"
  },
  {
    "id": "5",
    "title": "Concept Photo B",
    "date": "2026-03-30",
    "endDate": "2026-03-31",
    "description": "Coming Soon",
    "type": "CONCEPT PHOTO"
  },
  {
    "id": "6",
    "title": "Visual Sampler B",
    "date": "2026-04-02",
    "description": "Coming Soon",
    "type": "CONCEPT PHOTO"
  },
  {
    "id": "7",
    "title": "Track List",
    "date": "2026-04-06",
    "description": "Coming Soon",
    "type": "ALBUM PREVIEW"
  },
  {
    "id": "8",
    "title": "Physical Album Preview",
    "date": "2026-04-07",
    "description": "Coming Soon",
    "type": "ALBUM PREVIEW"
  },
  {
    "id": "9",
    "title": "Highlight Medley",
    "date": "2026-04-08",
    "description": "Coming Soon",
    "type": "ALBUM PREVIEW"
  },
  {
    "id": "10",
    "title": "M/V Teaser",
    "date": "2026-04-10",
    "description": "Coming Soon",
    "type": "PROMOTION"
  },
  {
    "id": "11",
    "title": "'Caligo Pt.2' M/V & Digital Release",
    "date": "2026-04-13",
    "time": "6PM (KST)",
    "description": "Coming Soon",
    "type": "COMEBACK"
  },
  {
    "id": "12",
    "title": "'Caligo Pt.2' Album Release",
    "date": "2026-04-14",
    "description": "Coming Soon",
    "type": "COMEBACK"
  }
];
