import React from "react";
import { CommonLayout } from "./common-layout";
import { CommonHeader } from "./common-header";
import { BlogFooter } from "./blog-footer";
import clsx from "clsx";
import { BlogHero } from "./blog-hero";

type Props = {
  showSidebarBanner?: boolean;
  showHero?: boolean;
} & Record<string, any>;

export const RefineBlogLayout = (props: Props) => {
  const { children, toc, ...layoutProps } = props;

  return (
    <CommonLayout
      {...layoutProps}
      className={clsx("bg-white dark:bg-refine-react-8")}
    >
      {/* If there's TOC, then we can say that this is a blog post page. */}
      {/* Then we can pass `trackProgress` prop to the header. */}
      <CommonHeader
        hasSticky={true}
        trackProgress={!!toc}
        variant="blog"
        className={clsx(
          "!bg-white dark:!bg-refine-react-8",
          "!bg-opacity-100 dark:!bg-opacity-100",
        )}
      />
      {props.showHero && <BlogHero />}
      <div
        className={clsx(
          "flex",
          "gap-12",
          "justify-center",
          "mx-auto",
          "w-full",
          "relative",
        )}
      >
        <div className={clsx("refine-prose")}>{children}</div>
        {toc && (
          <div
            className={clsx(
              "w-[280px]",
              "hidden blog-max:block",
              "flex-shrink-0",
            )}
          >
            {toc}
          </div>
        )}
      </div>
      <BlogFooter variant="blog" />
    </CommonLayout>
  );
};
