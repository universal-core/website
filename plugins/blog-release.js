// A post is live once it is not a draft and its date has passed; production builds drop the rest.
function releaseState({ draft, date }, now = new Date()) {
  if (draft) return "draft";
  return new Date(date) > now ? "scheduled" : "live";
}

// Dev server always previews everything; BLOG_PREVIEW=1 does the same for a production build.
const previewUnreleased = () =>
  process.env.NODE_ENV !== "production" || process.env.BLOG_PREVIEW === "1";

module.exports = { releaseState, previewUnreleased };
