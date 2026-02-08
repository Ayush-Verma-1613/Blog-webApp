import Admin from "@/components/Admin"

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin panel for managing blog content",
};

const AdminRouter = () => {
    return(
        <>
        <Admin />
        </>
    )
}

export default AdminRouter