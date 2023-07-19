const Layout = ({children}:{children: React.ReactNode}) => {
    return (
        <div className="container">
            {children}
        </div>
    );
}

export default Layout;