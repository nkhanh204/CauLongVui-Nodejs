import React from 'react';

export default function Dashboard() {
  const stats = [
    { label: 'TỔNG DOANH THU', value: '45,000,000đ', sub: '+12% so với tháng trước' },
    { label: 'TỔNG ĐƠN ĐẶT', value: '1,284', sub: '85 đơn mới hôm nay' },
    { label: 'SÂN HOẠT ĐỘNG', value: '18/20', sub: '2 sân đang bảo trì' },
    { label: 'NGƯỜI DÙNG MỚI', value: '+42', sub: 'Trong 24h qua' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Tổng quan hệ thống</h1>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">DỮ LIỆU THỜI GIAN THỰC</p>
      </header>

      {/* Bento Grid Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Thống kê nhanh">
        {stats.map((stat, i) => (
          <article key={i} className="bento-card hover:scale-[1.02] transition-transform cursor-default">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
            <p className="text-[10px] font-bold text-teal-600 mt-2 uppercase">{stat.sub}</p>
          </article>
        ))}
      </section>

      {/* Placeholder for charts or more Bento boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bento-card h-80 flex items-center justify-center border-dashed border-2">
            <p className="text-xs font-black text-slate-300 uppercase tracking-widest italic">Biểu đồ doanh thu (Placeholder)</p>
        </section>
        <section className="bento-card h-80 flex flex-col">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Hoạt động gần đây</h4>
            <ul className="space-y-4 flex-1">
                {[1, 2, 3, 4].map(n => (
                    <li key={n} className="flex justify-between items-center border-b border-slate-50 pb-2">
                        <div className="text-xs font-bold text-slate-900 uppercase leading-none">Đặt sân #204{n}</div>
                        <div className="text-[10px] font-bold text-teal-600 uppercase leading-none">● THÀNH CÔNG</div>
                    </li>
                ))}
            </ul>
            <button type="button" aria-label="Xem tất cả hoạt động" className="w-full py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-teal-600 transition-colors mt-4">
                XEM TẤT CẢ
            </button>
        </section>
      </div>
    </div>
  );
}
