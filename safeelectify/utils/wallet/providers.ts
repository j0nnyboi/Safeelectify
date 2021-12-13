// import wallet adapters: LedgerWalletAdapter, SolongWalletAdapter, PhantomWalletAdapter
import Wallet from "@araviel/safe-wallet-adapter"
import {LedgerWalletAdapter } from './adapters'
//port Wallet from "@araviel/safe-wallet-adapter"

type Provider = {
  name: string,
  url: string,
  icon: string,
  adapter: any
}

export const providers: Provider[] = [

    {
      name: "Ledger",
      url: "https://www.ledger.com",
      icon: '/wallets/ledger.png',
      adapter: LedgerWalletAdapter
    },
    {
      name: "Safecoin",
      url: "https://www.safecoin.org",
      icon: '/wallets/ledger.png',
      adapter: Wallet
    }
  ]

/*
others: 
{
      name: "Solong",
      url: "/wallets/solong.png",
      adapter: SolongWalletAdapter,
    },
    {
      name: "Solflare",
      icon: `${ASSETS_URL}solflare.svg`,
    },
    {
      name: "MathWallet",
      url: "https://mathwallet.org",
    },
    {
      name: "Ledger",
      url: "https://www.ledger.com",
      adapter: LedgerWalletAdapter,
    },
    {
      name: "Phantom",
      url: "/wallets/phantom.png",
      adapter: PhantomWalletAdapter,
    },
*/
