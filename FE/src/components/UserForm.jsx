import React, { useState } from 'react';
import { Button } from './ui/Button';
import { useRoles } from '../hooks/useRoles';

export default function UserForm({ onSubmit, initialData, onCancel }) {
  const { data: roles } = useRoles();
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || '',
    phoneNumber: initialData?.phoneNumber || '',
    password: '',
    roleId: initialData?.roleId || '',
    isVerified: initialData ? initialData.isVerified : true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorDetails, setErrorDetails] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errorDetails.length > 0) {
      setErrorDetails((prev) => prev.filter((err) => err.field !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorDetails([]);

    try {
      // Don't send empty password if updating (BE handles this usually, but we haven't implemented User Update API, only Create)
      await onSubmit(formData);
    } catch (error) {
      console.error('Submit user error:', error);
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
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col">
        <header className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
              TẠO NGƯỜI DÙNG
            </h2>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
              THÊM TÀI KHOẢN VÀ PHÂN QUYỀN
            </p>
          </div>
          <button onClick={onCancel} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 font-bold transition-colors">✕</button>
        </header>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Họ Nguyễn (Tên Đầy Đủ) *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 uppercase transition-all" />
                {getFieldError('fullName') && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase">{getFieldError('fullName')}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Số Điện Thoại *</label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 transition-all" />
                {getFieldError('phoneNumber') && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase">{getFieldError('phoneNumber')}</p>}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Mật khẩu *</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required={!initialData} className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 transition-all" />
              {getFieldError('password') && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase">{getFieldError('password')}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Nhóm Quyền (Role) *</label>
                <select name="roleId" value={formData.roleId} onChange={handleChange} required className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 transition-all uppercase">
                  <option value="" disabled>--- CHỌN QUYỀN ---</option>
                  {(roles || []).map(r => (
                    <option key={r.id} value={r.id}>{r.roleName}</option>
                  ))}
                </select>
                {getFieldError('roleId') && <p className="text-[10px] font-bold text-red-500 mt-1 uppercase">{getFieldError('roleId')}</p>}
              </div>
              
               <div className="flex items-center gap-3 pt-6">
                <input type="checkbox" id="isVerified" name="isVerified" checked={formData.isVerified} onChange={handleChange} className="w-5 h-5 text-teal-600 border-slate-300 rounded focus:ring-teal-500 focus:ring-offset-0" />
                <label htmlFor="isVerified" className="text-xs font-black text-slate-900 uppercase">Đã xác thực</label>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" onClick={onCancel} className="px-6 py-3 rounded-xl text-xs font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 hover:text-slate-600 transition-colors">
              HỦY
            </button>
            <Button type="submit" isLoading={isSubmitting}>
              TẠO NGƯỜI DÙNG
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
