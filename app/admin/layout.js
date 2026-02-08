import AdminLayout from "@/components/AdminLayout";

const Layout = ({children}) => {
    return(
        <div>
            <AdminLayout>
                {children}
            </AdminLayout>
            
        </div>
    )
}

export default Layout;