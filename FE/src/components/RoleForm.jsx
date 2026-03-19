import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';

export default function RoleForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    roleName: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorDetails, setErrorDetails] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        roleName: initialData.roleName || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorDetails.length > 0) {
      setErrorDetails((prev) => prev.filter((err) => err.field !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorDetails([]);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Submit role error:', error);
      if (error?.details) {
        setErrorDetails(error.details);
      } else {
        alert(error.message || 'Có lỗi xảy ra!');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName) => {
    return errorDetails.find((err) => err.field === fieldName)?.message;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        <header className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
              {initialData ? 'SỬA QUYỀN' : 'TẠO QUYỀN MỚI'}
            </h2>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
              ĐỊNH NGHĨA QUYỀN TRUY CẬP
            </p>
          </div>
          <button onClick={onCancel} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 font-bold transition-colors">✕</button>
        </header>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tên Quyền (Role Name) *</label>
              <input type="text" name="roleName" value={formData.roleName} onChange={handleChange} required className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 uppercase transition-all" placeholder="VD: Admin, Staff, User" />
              {getFieldError('roleName') && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase">{getFieldError('roleName')}</p>}
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Mô tả chi tiết</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 resize-none" placeholder="Mô tả chức năng của nhóm quyền này..." />
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" onClick={onCancel} className="px-6 py-3 rounded-xl text-xs font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 hover:text-slate-600 transition-colors">
              HỦY
            </button>
            <Button type="submit" isLoading={isSubmitting}>
              {initialData ? 'CẬP NHẬT' : 'TẠO QUYỀN'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
