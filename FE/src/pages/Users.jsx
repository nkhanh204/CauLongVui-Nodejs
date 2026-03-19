import React, { useState } from 'react';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../hooks/useUsers';
import { Button } from '../components/ui/Button';
import UserForm from '../components/UserForm';

export default function Users() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const { data, isLoading, isError } = useUsers();
  
  const createMutation = useCreateUser({
    onSuccess: () => handleCloseForm(),
  });
  
  const updateMutation = useUpdateUser({
    onSuccess: () => handleCloseForm(),
  });
  
  const deleteMutation = useDeleteUser();

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (editingUser) {
      return updateMutation.mutateAsync({ id: editingUser.id, data: formData });
    } else {
      return createMutation.mutateAsync(formData);
    }
  };

  if (isLoading) return <div className="text-xs font-black uppercase text-slate-400 p-8">ĐANG TẢI DỮ LIỆU...</div>;
  if (isError) return <div className="text-xs font-black uppercase text-red-500 p-8">LỖI TẢI DỮ LIỆU</div>;

  const users = data?.items || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Quản lý Người Dùng</h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">DANH SÁCH THÀNH VIÊN VÀ QUYỀN</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} aria-label="Thêm người dùng">THÊM MỚI</Button>
      </header>

      <section className="bento-card overflow-hidden !p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Thông tin</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role ID</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tình trạng</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-[10px] font-black text-slate-300 uppercase italic">Chưa có người dùng nào</td>
              </tr>
            ) : users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{u.fullName}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1">{u.phoneNumber}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{u.roleId || 'N/A'}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${u.isVerified ? 'bg-teal-50 text-teal-600' : 'bg-red-50 text-red-600'}`}>
                    {u.isVerified ? '● ĐÃ XÁC THỰC' : '● CHƯA XÁC THỰC'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <nav className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={() => handleEdit(u)} className="text-[10px] font-black text-slate-400 hover:text-teal-600 uppercase tracking-widest">SỬA</button>
                    <span className="text-slate-200 text-xs">|</span>
                    <button type="button" onClick={() => { if(confirm('XÁC NHẬN XÓA USER?')) deleteMutation.mutate(u.id) }} className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest">XÓA</button>
                  </nav>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {isFormOpen && (
        <UserForm 
          onSubmit={handleSubmit}
          initialData={editingUser}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
}
