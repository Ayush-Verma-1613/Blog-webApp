import Slug from '@/components/slug';

/* ✅ generateMetadata MUST be async */
export const generateMetadata = async ({ params }) => {
  const { slug } = await params;

  const title = slug.split("-").join(" ");

  return {
    title,
  };
};

const SlugRoute = async ({ params }) => {
  /* ✅ unwrap params */
  const { slug } = await params;

  const res = await fetch(
    `${process.env.SERVER}/api/blog/slug/${slug}`,
    { cache: "no-store" }
  );

  const blog = await res.json();

  return (
    <Slug
      title={slug}
      description={blog.description}
      image={blog.image}
    />
  );
};

export default SlugRoute;
