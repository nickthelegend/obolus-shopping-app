"use client"

import type React from "react"
import { PrivyProvider } from "@privy-io/react-auth"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || "cmkr3rc4i00iujs0cgnug0qzj"}
            config={{
                appearance: {
                    theme: "dark",
                    accentColor: "#FFFFFF",
                },
                embeddedWallets: {
                    ethereum: {
                        createOnLogin: "users-without-wallets",
                    }
                },
                defaultChain: {
                    id: 102036,
                    name: "Creditcoin USC Testnet 2",
                    network: "usc-testnet-2",
                    nativeCurrency: {
                        name: "tCTC",
                        symbol: "tCTC",
                        decimals: 18,
                    },
                    rpcUrls: {
                        default: {
                            http: ["https://rpc.usc-testnet2.creditcoin.network"],
                        },
                        public: {
                            http: ["https://rpc.usc-testnet2.creditcoin.network"],
                        },
                    },
                },
                supportedChains: [
                    {
                        id: 102036,
                        name: "Creditcoin USC Testnet 2",
                        network: "usc-testnet-2",
                        nativeCurrency: { name: "tCTC", symbol: "tCTC", decimals: 18 },
                        rpcUrls: {
                            default: { http: ["https://rpc.usc-testnet2.creditcoin.network"] },
                            public: { http: ["https://rpc.usc-testnet2.creditcoin.network"] },
                        },
                        blockExplorers: {
                            default: { name: "Explorer", url: "https://explorer.usc-testnet2.creditcoin.network" },
                        },
                    }
                ]
            }}
        >
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </PrivyProvider>
    )
}
