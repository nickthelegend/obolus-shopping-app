"use client"

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { initiatePolarisPayment } from "@/app/actions/payment";
import { CreditCard, ShieldCheck, Zap, Loader2, User, Mail, MapPin, ArrowLeft, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";

export default function CheckoutPage() {
    const { total, items } = useCart();
    const router = useRouter();
    const { login, authenticated, user } = usePrivy();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "Avery Sterling",
        email: "avery@syndicate.net",
        address: "7th Sector Node, Neo-Tokyo 2045"
    });

    const handlePolarisPay = async () => {
        setLoading(true);
        const result = await initiatePolarisPayment(total, `Order for ${items.length} Modules`);

        if (result.error) {
            alert(`Error: ${result.error}`);
            setLoading(false);
        } else if (result.checkoutUrl) {
            // Open the Polaris Checkout Hub in a new popup window
            const width = 500;
            const height = 700;
            const left = window.screenX + (window.outerWidth - width) / 2;
            const top = window.screenY + (window.outerHeight - height) / 2;

            window.open(
                result.checkoutUrl,
                "Polaris_Secure_Settlement",
                `width=${width},height=${height},left=${left},top=${top},status=no,menubar=no,toolbar=no`
            );

            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-white/40 hover:text-white mb-12 transition-all uppercase text-[10px] font-bold tracking-widest group">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Return_To_Inventory
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Settlement Info */}
                <div className="flex flex-col gap-10">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">Finalize_Settlement</h1>
                        <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Verify your deployment details and select a protocol.</p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest italic">Recipient_Data</label>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="bg-white/5 border border-white/10 p-3 rounded flex items-center gap-3">
                                    <User className="w-4 h-4 text-white/20" />
                                    <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-transparent border-none outline-none text-xs font-bold w-full" />
                                </div>
                                <div className="bg-white/5 border border-white/10 p-3 rounded flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-white/20" />
                                    <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-transparent border-none outline-none text-xs font-bold w-full" />
                                </div>
                                <div className="bg-white/5 border border-white/10 p-3 rounded flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-white/20" />
                                    <input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="bg-transparent border-none outline-none text-xs font-bold w-full" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 mt-4">
                            <label className="text-[10px] uppercase font-bold text-white/40 tracking-widest italic">Protocol_Selection</label>

                            <button
                                onClick={handlePolarisPay}
                                disabled={loading}
                                className="group relative overflow-hidden bg-primary p-6 rounded-lg border-2 border-white/10 hover:border-white/40 transition-all flex flex-col gap-4 text-left"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                                            <Zap className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="font-black text-sm text-white uppercase tracking-tighter">
                                            Pay_Via_Polaris
                                        </span>
                                    </div>
                                    <span className="bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black px-2 py-0.5 rounded uppercase">0%_APR</span>
                                </div>
                                <p className="text-[11px] text-white/60 leading-relaxed font-medium">
                                    Buy now, pay later with your Polaris Credit Limit. Zero-collateral, sub-second settlement on Creditcoin USC Hub.
                                </p>
                                {loading && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                                        <Loader2 className="w-6 h-6 animate-spin text-white" />
                                    </div>
                                )}
                            </button>

                            <div className="p-4 rounded border border-white/5 opacity-50 cursor-not-allowed">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold uppercase text-white/40">Standard Credit Card</span>
                                    <span className="text-[10px] font-black text-white/20">UNAVAILABLE</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="flex flex-col gap-8 bg-white/[0.02] border border-white/10 p-8 rounded-xl h-fit sticky top-12">
                    <h3 className="text-xl font-bold uppercase tracking-tighter">Inventory_Summary</h3>
                    <div className="divide-y divide-white/10">
                        {items.map(item => (
                            <div key={item.id} className="py-4 flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold uppercase">{item.name}</span>
                                    <span className="text-[10px] text-white/40 uppercase">x{item.quantity} units</span>
                                </div>
                                <span className="text-sm font-black">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4 pt-6 border-t border-white/20">
                        <div className="flex justify-between items-center text-white/40 text-[10px] font-bold uppercase tracking-widest">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-white/40 text-[10px] font-bold uppercase tracking-widest">
                            <span>Protocol Fee</span>
                            <span className="text-green-500">Free</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-2">
                            <span className="text-lg font-black uppercase italic">Total Settlement</span>
                            <span className="text-2xl font-black">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded border border-white/10">
                        <ShieldCheck className="w-5 h-5 text-green-500" />
                        <span className="text-[10px] font-bold text-white/60 leading-tight uppercase tracking-wider">
                            Secured by Creditcoin Native Verification & Polaris Escrow Protocol
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
