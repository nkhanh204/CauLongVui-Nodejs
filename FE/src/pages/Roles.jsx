import React, { useState } from 'react';
import { useRoles, useCreateRole } from '../hooks/useRoles';
import { Button } from '../components/ui/Button';
import RoleForm from '../components/RoleForm';

export default function Roles() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data, isLoading, isError } = useRoles();
  
  const createMutation = useCreateRole({
    onSuccess: () => setIsFormOpen(false),
  });

  const handleSubmit = async (formData) => {
    return createMutation.mutateAsync(formData);
  };

  if (isLoading) return <div className="text-xs font-black uppercase text-slate-400 p-8">ĐANG TẢI DỮ LIỆU...</div>;
  if (isError) return <div className="text-xs font-black uppercase text-red-500 p-8">LỖI TẢI DỮ LIỆU</div>;

  const roles = data || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Quản lý Phân Quyền</h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">NHÓM QUYỀN TRUY CẬP HỆ THỐNG</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} aria-label="Thêm quyền mới">THÊM MỚI</Button>
      </header>

      <section className="bento-card overflow-hidden !p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Hệ Thống</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tên Quyền</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mô tả</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {roles.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-[10px] font-black text-slate-300 uppercase italic">Chưa có vai trò nào</td>
              </tr>
            ) : roles.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{r.id}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-black px-3 py-1 bg-slate-100 text-slate-600 rounded-lg uppercase tracking-widest">{r.roleName}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs font-bold text-slate-400 uppercase max-w-sm truncate">{r.description || 'Không có mô tả'}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {isFormOpen && (
        <RoleForm 
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
