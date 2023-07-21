import Sidebar from "./sidebar";
const Layout = ({children}:{children:React.ReactNode}) => {
    return (
        <div className="flex flex-wrap gap-4">
            <Sidebar />
            <div className="flex-1 p-4">
                {children}
            </div>
            
        </div>
    );
}

export default Layout;