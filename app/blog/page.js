import Blog from '@/components/blog';

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blogs",
  description: "Read latest blogs",
};

const BlogRouter = async () => {
  const blog = await fetch(`${process.env.SERVER}/api/blog`, {
    cache: "no-store",
  });

  const data = await blog.json();

  return <Blog data={data} />;
};

export default BlogRouter;
