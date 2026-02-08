
import Blog from '@/components/blog';

export const metadata = {
  title: "Blogs",
  description: "Read latest blogs",
};

const BlogRouter = async() => {
  const blog = await fetch(`${process.env.SERVER}api/blog`)
  const data = await blog.json()
  return(<Blog data={data}/>
  )
}

export default BlogRouter;