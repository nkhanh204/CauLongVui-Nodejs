import React from 'react';
import { useBookings, useUpdateBookingStatus, useDeleteBooking } from '../hooks/useBookings';

export default function Bookings() {
  const { data, isLoading, isError } = useBookings();
  const updateStatusMutation = useUpdateBookingStatus();
  const deleteMutation = useDeleteBooking();

  if (isLoading) return <div className="text-xs font-black uppercase text-slate-400 p-8">ĐANG TẢI DỮ LIỆU...</div>;
  if (isError) return <div className="text-xs font-black uppercase text-red-500 p-8">LỖI TẢI DỮ LIỆU</div>;

  const bookings = data?.items || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Quản lý Đặt chỗ</h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">THEO DÕI VÀ DUYỆT LỊCH ĐẶT SÂN</p>
        </div>
      </header>

      <section className="bento-card overflow-hidden !p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sân / Khung Giờ</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Trạng thái</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-[10px] font-black text-slate-300 uppercase italic">Chưa có giao dịch nào</td>
              </tr>
            ) : bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <p className="text-xs font-black text-slate-900 uppercase tracking-tight">#{booking.id.slice(-6)}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs font-bold text-slate-900 uppercase">{booking.courtId}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{booking.bookingDate}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${booking.status === 'Confirmed' ? 'bg-teal-50 text-teal-600' : booking.status === 'Cancelled' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                    ● {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <nav className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {booking.status === 'Pending' && (
                      <button type="button" onClick={() => updateStatusMutation.mutate({ id: booking.id, status: 'Confirmed'})} className="text-[10px] font-black text-teal-600 uppercase tracking-widest">DUYỆT</button>
                    )}
                    {booking.status === 'Pending' && <span className="text-slate-200 text-xs">|</span>}
                    {booking.status === 'Pending' && (
                      <button type="button" onClick={() => updateStatusMutation.mutate({ id: booking.id, status: 'Cancelled'})} className="text-[10px] font-black text-amber-600 uppercase tracking-widest">HỦY</button>
                    )}
                    <span className="text-slate-200 text-xs">|</span>
                    <button type="button" onClick={() => { if(confirm('XÁC NHẬN XÓA?')) deleteMutation.mutate(booking.id) }} className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest">XÓA</button>
                  </nav>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
