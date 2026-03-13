"use client"

import '@rainbow-me/rainbowkit/styles.css'
import {
    getDefaultConfig,
    RainbowKitProvider,
    darkTheme,
} from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { avalancheFuji, polygonAmoy } from 'wagmi/chains'
import { defineChain } from 'viem'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const monadTestnet = defineChain({
    id: 10143,
    name: 'Monad Testnet',
    nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://testnet-rpc.monad.xyz'] },
    },
    blockExplorers: {
        default: { name: 'MonadExplorer', url: 'https://testnet.monadexplorer.com' },
    },
    testnet: true,
})

const config = getDefaultConfig({
    appName: 'Obolus Store',
    projectId: '1745eedb32cb0f103490b50b14761c85',
    chains: [monadTestnet, avalancheFuji, polygonAmoy],
    ssr: true,
})

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={darkTheme({
                        accentColor: '#9fd843',
                        accentColorForeground: 'black',
                        borderRadius: 'large',
                        fontStack: 'system',
                        overlayBlur: 'small',
                    })}
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
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
