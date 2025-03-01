import type { BlogPost } from "contentlayer/generated";
import Mdx from "@/comp/mdx/layers";
import { LikeButton } from "@/src/comp/uis/like-button";
import { ScrollProgress } from "@/src/comp/uis/scroll-progress";
import { getHeadings } from "@/utils/get-headings";

import TableOfContents from "./table-of-contents";

interface ContentProps {
  post: BlogPost;
  slug: string;
}

const Content = (props: ContentProps) => {
  const { post, slug } = props;
  const headings = getHeadings(post.body.raw);

  return (
    <div className="mt-8 flex flex-col justify-between lg:flex-row">
      <ScrollProgress className="top-14" />
      <article className="w-full lg:w-full lg:pr-10">
        <Mdx code={post.body.code} />
      </article>
      <aside className="lg:min-w-[220px] lg:max-w-[220px]">
        <div className="sticky top-24 mt-10 border-l">
          {headings && headings.length > 0 && (
            <TableOfContents headings={headings} />
          )}
          <div className="mt-10 px-4">
            <LikeButton slug={slug} />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Content;
