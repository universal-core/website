import React from "react";
import clsx from "clsx";
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import {
  BlogPostProvider,
  useBlogPost,
} from "@docusaurus/theme-common/internal";
import BlogLayout from "@theme/BlogLayout";
import BlogPostPageMetadata from "@theme/BlogPostPage/Metadata";
import { BlogTOC } from "../../refine-theme/blog-toc";

import { BlogPostPageView, PostPaginator } from "../../components/blog";

// Only previews reach this: production builds drop drafts and future-dated posts.
function UnreleasedBanner({ metadata }) {
  const { draft } = metadata.frontMatter;
  const date = new Date(metadata.date);
  if (!draft && date <= new Date()) return null;
  return (
    <div className="uc-unreleased" role="note">
      {draft
        ? "Draft: not published until draft: true is removed."
        : `Scheduled: goes live with the first deploy on or after ${metadata.formattedDate}.`}
    </div>
  );
}

function BlogPostPageContent({ children }) {
  const { metadata, toc } = useBlogPost();
  const { relatedPosts } = metadata;

  return (
    <BlogLayout toc={<BlogTOC toc={toc} />}>
      <UnreleasedBanner metadata={metadata} />
      <BlogPostPageView>{children}</BlogPostPageView>
      <PostPaginator title="Related Articles" posts={relatedPosts} />
    </BlogLayout>
  );
}

export default function BlogPostPage(props) {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
        )}
      >
        <BlogPostPageMetadata />
        <BlogPostPageContent>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
