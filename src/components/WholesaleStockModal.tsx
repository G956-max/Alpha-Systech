import { useState } from 'react';
import { X, Download, Search, CheckCircle, FileSpreadsheet, PhoneCall, MapPin, MessageCircle } from 'lucide-react';
import { allProducts } from '../data/products';

interface WholesaleStockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WholesaleStockModal({ isOpen, onClose }: WholesaleStockModalProps) {
  const [filter, setFilter] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.category.toLowerCase().includes(filter.toLowerCase()) ||
    p.fabric.toLowerCase().includes(filter.toLowerCase())
  );

  const downloadCSV = () => {
    const headers = ["Product Name", "Category", "Fabric", "Sizes Available", "Retail Price (₹)", "Wholesale Bundle Price (₹)", "Bundle Pack Quantity", "Description"];
    
    const rows = allProducts.map(p => {
      return [
        `"${p.name.replace(/"/g, '""')}"`,
        `"${p.category}"`,
        `"${p.fabric.replace(/"/g, '""')}"`,
        `"${p.sizes.join(' | ')}"`,
        p.price,
        p.wholesalePrice,
        p.bundleQuantity,
        `"${p.description.replace(/"/g, '""')}"`
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Sri_Aadhi_Nayaga_Tex_Erode_Price_List_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-400 text-slate-950 rounded-2xl">
              <FileSpreadsheet size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-serif font-bold">Sri Aadhi Nayaga Tex Wholesale Price Sheet</h3>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wider">
                  Erode Market
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5 flex items-center gap-1.5">
                <MapPin size={12} className="text-amber-400" />
                53/A, Eswaran Temple, Kamarajar Street - 1, Erode - 638001 • Ph: 9655147000 / 9655148000
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={downloadCSV}
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow"
            >
              <Download size={14} />
              Export .CSV Sheet
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2 transition-colors rounded-full hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-2.5 flex items-center gap-2 text-emerald-800 text-xs font-semibold">
            <CheckCircle size={16} />
            Price sheet exported successfully! Open with Excel or Google Sheets.
          </div>
        )}

        {/* Search & Stats Bar */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search Sarees, Nighties, Lungis, Inskirts, Vetti..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-full pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>Showing <b>{filteredProducts.length}</b> products</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Direct Erode Weaver Wholesale Rates
            </span>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto flex-grow p-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-indigo-50/60 text-indigo-950 font-bold border-b border-indigo-100 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">Product Name</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2">Fabric</th>
                <th className="py-3 px-2">Sizes Available</th>
                <th className="py-3 px-3">Retail Price</th>
                <th className="py-3 px-3 text-emerald-800">Wholesale Bundle Rate</th>
                <th className="py-3 px-2">Pack Qty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((p) => {
                return (
                  <tr key={p.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900">{p.name}</td>
                    <td className="py-3 px-2 text-gray-600">{p.category}</td>
                    <td className="py-3 px-2 text-gray-500">{p.fabric}</td>
                    <td className="py-3 px-2 font-medium text-slate-700">{p.sizes[0]}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">₹{p.price.toLocaleString()}</td>
                    <td className="py-3 px-3 font-black text-emerald-700">₹{p.wholesalePrice.toLocaleString()} / pc</td>
                    <td className="py-3 px-2 font-bold text-indigo-900">Pack of {p.bundleQuantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <div>
            Need bulk bale orders or parcel dispatch to your town? 
            <span className="font-bold text-slate-900 ml-1">WhatsApp: 9655147000 / 9655148000</span>
          </div>
          <a
            href="https://wa.me/919655147000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-full font-bold text-xs hover:bg-green-500 transition-colors"
          >
            <MessageCircle size={14} /> WhatsApp Direct Order
          </a>
        </div>
      </div>
    </div>
  );
}
