const Dashboard = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Welcome Admin</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">Users</div>
                <div className="bg-white p-4 rounded shadow">Orders</div>
                <div className="bg-white p-4 rounded shadow">Revenue</div>
            </div>
        </div>
    );
};

export default Dashboard;
