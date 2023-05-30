export default interface PostInterface {
    /* all_awardings: any[]; // replace "any" with a more specific type if possible
    allow_live_comments: boolean;
    approved_at_utc: number | null;
    approved_by: string | null; */
    archived: boolean;
    author: string;
    /* author_flair_background_color: string | null;
    author_flair_css_class: string | null;
    author_flair_richtext: any[]; // replace "any" with a more specific type if possible
    author_flair_template_id: string | null;
    author_flair_text: string | null;
    author_flair_text_color: string | null;
    author_flair_type: string; */
    author_fullname: string;
    author_is_blocked: boolean;
    /* author_patreon_flair: boolean;
    author_premium: boolean;
    awarders: any[]; // replace "any" with a more specific type if possible
    banned_at_utc: number | null;
    banned_by: string | null;
    can_gild: boolean;
    can_mod_post: boolean; */
    category: string | null;
    clicked: boolean;
    comments: any[]; // replace "any" with a more specific type if possible
    /* content_categories: string | null;
    contest_mode: boolean; */
    created: number;
    created_utc: number;
    /*discussion_type: string | null;
    distinguished: string | null;
    domain: string; */
    downs: number;
    edited: boolean;
    /* gilded: number;
    gildings: {[key: string]: number}; // object with string keys and number values */
    hidden: boolean;
    hide_score: boolean;
    id: string;
    is_created_from_ads_ui: boolean;
/*     is_crosspostable: boolean;
    is_meta: boolean;
    is_original_content: boolean;
    is_reddit_media_domain: boolean;
    is_robot_indexable: boolean;
 */    is_self: boolean;
    is_video: boolean;
    likes: boolean | null;
    /* link_flair_background_color: string;
    link_flair_css_class: string;
    link_flair_richtext: any[]; // replace "any" with a more specific type if possible
    link_flair_template_id: string;
    link_flair_text: string;
    link_flair_text_color: string;
    link_flair_type: string; */
    locked: boolean;
    media: null | { [key: string]: any }; // replace "any" with a more specific type if possible
    media_embed: { [key: string]: any }; // replace "any" with a more specific type if possible
    media_only: boolean;
    /* mod_note: string | null;
    mod_reason_by: string | null;
    mod_reason_title: string | null;
    mod_reports: any[]; // replace "any" with a more specific type if possible */
    name: string;
    no_follow: boolean;
    num_comments: number;
    num_crossposts: number;
    num_reports: number | null;
    over_18: boolean;
    parent_whitelist_status: string;
    permalink: string;
    pinned: boolean; /*
        post_hint: string | null; */
    preview: { [key: string]: any }; // replace "any" with a more specific type if possible
    pwls: number;
    quarantine: boolean;
    /* removal_reason: string | null;
    removed_by: string | null;
    removed_by_category: string | null;
    report_reasons: string | null; */
    saved: boolean;
    score: number;
    //secure_media: null;
    //secure_media_embed: Record<string, unknown>;
    selftext: string;
    selftext_html: null;
    //send_replies: boolean;
    //spoiler: boolean;
    stickied: boolean;
    subreddit: string;
    subreddit_id: string;
    subreddit_name_prefixed: string;
    subreddit_subscribers: number;
    subreddit_type: string;
    suggested_sort: null;
    thumbnail: string;
    /* thumbnail_height: number;
    thumbnail_width: number; */
    title: string;
    /* top_awarded_type: null;
    total_awards_received: number;
    treatment_tags: unknown[]; */
    ups: number;
    upvote_ratio: number;
    url: string;
    url_overridden_by_dest: string;
    /*user_reports: unknown[];
    view_count: null; */
    visited: boolean;
    /*whitelist_status: string;
    wls: number; */
}
