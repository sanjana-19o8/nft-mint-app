import { Install, Home } from '@/frontend/components'
import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum: ExternalProvider | JsonRpcFetchFunc;
  }
}

export default function App() {
  if(typeof window !== 'undefined' && window.ethereum) {
    return <Home />;
  } else {
    return <Install />
  }
}
