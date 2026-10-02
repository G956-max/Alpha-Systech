import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-rose-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-amber-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/20 text-rose-200 rounded-xl">
              <Ruler size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Standard Dress & Apparel Size Guide</h3>
              <p className="text-xs text-rose-200 mt-0.5">All measurements listed in inches</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-rose-200 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          <div>
            <h4 className="font-bold text-sm text-rose-900 mb-3 uppercase tracking-wider">
              Women's Kurtis, Gowns & Suits
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-rose-50/70 text-rose-950 font-bold">
                    <th className="p-2.5 border border-gray-200">Size Tag</th>
                    <th className="p-2.5 border border-gray-200">Bust (Inches)</th>
                    <th className="p-2.5 border border-gray-200">Waist (Inches)</th>
                    <th className="p-2.5 border border-gray-200">Hip (Inches)</th>
                    <th className="p-2.5 border border-gray-200">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="p-2.5 font-bold border">XS (34)</td><td className="p-2.5 border">34"</td><td className="p-2.5 border">28"</td><td className="p-2.5 border">36"</td><td className="p-2.5 border">44" - 46"</td></tr>
                  <tr className="bg-gray-50/50"><td className="p-2.5 font-bold border">S (36)</td><td className="p-2.5 border">36"</td><td className="p-2.5 border">30"</td><td className="p-2.5 border">38"</td><td className="p-2.5 border">44" - 46"</td></tr>
                  <tr><td className="p-2.5 font-bold border">M (38)</td><td className="p-2.5 border">38"</td><td className="p-2.5 border">32"</td><td className="p-2.5 border">40"</td><td className="p-2.5 border">44" - 46"</td></tr>
                  <tr className="bg-gray-50/50"><td className="p-2.5 font-bold border">L (40)</td><td className="p-2.5 border">40"</td><td className="p-2.5 border">34"</td><td className="p-2.5 border">42"</td><td className="p-2.5 border">45" - 47"</td></tr>
                  <tr><td className="p-2.5 font-bold border">XL (42)</td><td className="p-2.5 border">42"</td><td className="p-2.5 border">36"</td><td className="p-2.5 border">44"</td><td className="p-2.5 border">45" - 47"</td></tr>
                  <tr className="bg-gray-50/50"><td className="p-2.5 font-bold border">XXL (44)</td><td className="p-2.5 border">44"</td><td className="p-2.5 border">38"</td><td className="p-2.5 border">46"</td><td className="p-2.5 border">46" - 48"</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm text-rose-900 mb-3 uppercase tracking-wider">
              Men's Shirts & Kurtas
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold">
                    <th className="p-2.5 border border-gray-200">Size</th>
                    <th className="p-2.5 border border-gray-200">Chest</th>
                    <th className="p-2.5 border border-gray-200">Shoulder</th>
                    <th className="p-2.5 border border-gray-200">Sleeve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="p-2.5 font-bold border">38 (S)</td><td className="p-2.5 border">39" - 40"</td><td className="p-2.5 border">17.5"</td><td className="p-2.5 border">24.5"</td></tr>
                  <tr className="bg-gray-50/50"><td className="p-2.5 font-bold border">40 (M)</td><td className="p-2.5 border">41" - 42"</td><td className="p-2.5 border">18.5"</td><td className="p-2.5 border">25.0"</td></tr>
                  <tr><td className="p-2.5 font-bold border">42 (L)</td><td className="p-2.5 border">43" - 44"</td><td className="p-2.5 border">19.5"</td><td className="p-2.5 border">25.5"</td></tr>
                  <tr className="bg-gray-50/50"><td className="p-2.5 font-bold border">44 (XL)</td><td className="p-2.5 border">45" - 46"</td><td className="p-2.5 border">20.5"</td><td className="p-2.5 border">26.0"</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-amber-900 text-xs">
            <b>Note on Sarees & Lehengas:</b> All Sarees are standard 6.3 meters with 0.8m unstitched blouse piece. Lehengas come semi-stitched with up to 42" waist flare and can be customized by your local tailor.
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-xs uppercase"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
