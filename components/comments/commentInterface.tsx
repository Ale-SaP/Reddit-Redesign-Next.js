export default interface Comment {
  /* all_awardings: any[];
  approved_at_utc: null;
  approved_by: null; */
  archived: boolean;
  associated_award: null;
  author: string;
  /* author_flair_background_color: string;
  author_flair_css_class: null;
  author_flair_richtext: any[];
  author_flair_template_id: string;
  author_flair_text: string;
  author_flair_text_color: string;
  author_flair_type: string;
  author_fullname: string;
  author_is_blocked: boolean;
  author_patreon_flair: boolean;
  author_premium: boolean; */
  /* awarders: any[];
  banned_at_utc: null;
  banned_by: null; */
  body: string;
  /* body_html: string;
  can_gild: boolean;
  can_mod_post: boolean;
  collapsed: boolean;
  collapsed_because_crowd_control: null;
  collapsed_reason: null;
  collapsed_reason_code: null; */
  comment_type: null;
  controversiality: number;
  created: number;
  created_utc: number;
  depth: number;
  /* distinguished: null; */
  downs: number;
  edited: boolean;
  /* gilded: number;
  gildings: any; */
  id: string;
  is_submitter: boolean;
  likes: null;
  link_id: string;
  locked: boolean;
  /* mod_note: null;
  mod_reason_by: null;
  mod_reason_title: null;
  mod_reports: any[]; */
  name: string;
  /* no_follow: boolean;
  num_reports: null;
  parent_id: string; */
  permalink: string;
  /* removal_reason: null; */
  replies: any[];
  /* report_reasons: null; */
  saved: boolean;
  score: number;
  /* score_hidden: boolean;
  send_replies: boolean; */
  stickied: boolean;
  subreddit: string;
  subreddit_id: string;
  subreddit_name_prefixed: string;
  subreddit_type: string;
  /* top_awarded_type: null; */
  total_awards_received: number;
  treatment_tags: any[];
  /* unrepliable_reason: null; */
  ups: number;
  /* user_reports: any[]; */
}
