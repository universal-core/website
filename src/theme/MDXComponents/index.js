import MDXComponents from "@theme-original/MDXComponents";

import CommonDetails from "@site/src/refine-theme/common-details";
import CommonSummary from "@site/src/refine-theme/common-summary";
import CommonTabItem from "@site/src/refine-theme/common-tab-item";
import CommonTabs from "@site/src/refine-theme/common-tabs";
import { Blockquote } from "@site/src/refine-theme/common-blockquote";
import { Image } from "@site/src/components/image";
import { Table, FullTable } from "@site/src/refine-theme/common-table";
import { VideoInView } from "@site/src/components/video-in-view";

export default {
  ...MDXComponents,
  details: CommonDetails,
  summary: CommonSummary,
  Tabs: CommonTabs,
  TabItem: CommonTabItem,
  blockquote: Blockquote,
  Image,
  table: Table,
  FullTable,
  VideoInView,
};
