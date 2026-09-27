import React, { useState } from 'react';
import { EVENT_DETAILS } from '../data/mockData';

interface PrintLabFulfillmentProps {
  isDarkTheme?: boolean;
}

export const PrintLabFulfillment: React.FC<PrintLabFulfillmentProps> = ({ isDarkTheme = false }) => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-9821',
      guestName: 'Ananya V.',
      items: '5×7 Pearl Matte (4 copies)',
      table: 'Table 4',
      status: 'Printing',
      time: '6m ago',
      amount: '$48.00',
    },
    {
      id: 'ORD-9820',
      guestName: 'Kabir M.',
      items: '8×10 Monograph Custom Framed',
      table: 'Table 4',
      status: 'Queued',
      time: '18m ago',
      amount: '$38.00',
    },
    {
      id: 'ORD-9819',
      guestName: 'Rohan & Priya (VIP)',
      items: 'Full Reception Master Box (20 FineArt Slips)',
      table: 'Head Table',
      status: 'Completed',
      time: '45m ago',
      amount: '$240.00',
    },
  ]);

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 dark:text-white">
            Print Lab & Archival Fulfillment
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dye-sublimation kiosks, fine-art slips, and on-site guest print dispatch.
          </p>
        </div>
        <button
          onClick={() => alert('Sending test calibration pattern to Dye-Sub Printer 01')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition-colors self-start shadow-xs"
        >
          <span className="material-symbols-outlined text-base">print</span>
          <span>Printer Calibration Test</span>
        </button>
      </div>

      {/* Lab Station Diagnostics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className={`p-5 rounded-2xl border transition-colors shadow-xs ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              DNP DS820 Dye-Sub (Unit A)
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Online
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display font-bold text-2xl text-slate-900 dark:text-white">18</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">prints queued</span>
          </div>
          <span className="font-mono-tech text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
            Media Roll: 240 / 400 sheets remaining
          </span>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-colors shadow-xs ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Hahnemühle Pearl Paper Stock
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              310 GSM
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display font-bold text-2xl text-slate-900 dark:text-white">84%</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">tray capacity</span>
          </div>
          <span className="font-mono-tech text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
            Pre-cut 5×7" & 8×10" sheets loaded
          </span>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-colors shadow-xs ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Turnaround Latency
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold uppercase bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              Fast
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display font-bold text-2xl text-slate-900 dark:text-white">42s</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">average per print</span>
          </div>
          <span className="font-mono-tech text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
            Automatic thermal dry & lamination
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <div
        className={`p-6 rounded-2xl border transition-colors shadow-xs overflow-hidden ${
          isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200/90'
        }`}
      >
        <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
          Active Event Orders & Dispatch Queue
        </h3>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-stone-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono-tech uppercase text-[10px]">
              <tr>
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Guest Name</th>
                <th className="pb-3">Specifications</th>
                <th className="pb-3">Table</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-slate-800">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-stone-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-mono-tech text-amber-600 dark:text-amber-400 font-semibold">{ord.id}</td>
                  <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">{ord.guestName}</td>
                  <td className="py-3 text-slate-600 dark:text-slate-400">{ord.items}</td>
                  <td className="py-3 font-mono-tech text-slate-500 dark:text-slate-400">{ord.table}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full font-mono-tech text-[10px] font-bold ${
                        ord.status === 'Printing'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse'
                          : ord.status === 'Queued'
                          ? 'bg-stone-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 font-mono-tech font-bold text-slate-800 dark:text-slate-200">
                    {ord.amount}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => alert(`Printing packing slip for ${ord.id}`)}
                      className="px-2.5 py-1 rounded-lg border border-stone-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-700 text-[11px] font-medium transition-colors"
                    >
                      Slip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
