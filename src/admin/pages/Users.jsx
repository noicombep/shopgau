import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { adminApi } from "../../api/adminApi";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminApi.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminApi.updateUserRole(userId, newRole);
      setUsers(users.map(user =>
        user.id === userId ? { ...user, roleId: newRole } : user
      ));
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.roleId}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="2">Customer</option>
                    <option value="1">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button className="text-red-500 hover:underline">Block</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}