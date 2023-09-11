interface Config {
  admin: string;
  welcome: string;
  newbie: string;
  senior: string;
  alumnai: string;
  attendance?: string;
  rpcUrls: string;
}
interface Configs {
  [chainId: number]: Config;
}
export const CONFIGS: Configs[] = [
  {
    5: {
      admin: "0x1d90546025045056c869a8cf548a38b69082e27a",
      welcome: "0x409ca90802bf5848e35dc664c7f4afd60eabae2b",
      newbie: "0x6d4589bb995e339bc82de062eb8af832ebeefc2f",
      senior: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      alumnai: "0x14223fb38d9cc73b5e8daff4b36fd8b1c3ff3658",
      rpcUrls: "https://rpc.ankr.com/eth_goerli",
    },
  },
  {
    137: {
      admin: "0x8464a3d93ce2df8fc19d8bcd7ca282ae80dd58b0",
      welcome: "0xddd04d3e9ad4d253a13cf55ed8809b3ecede9620",
      newbie: "0x47eaf58d1135e590c3e381219aa7f19f64776cc3",
      senior: "0xc579467d3835414556603dc8a147ac4681c46c07",
      alumnai: "0x26c706bfa42488f925879542b1ecab76d6110446",
      attendance: "0xb076d9F6ab7320845d617c853d5c8093Ce86f02c",
      rpcUrls: "https://polygon.blockpi.network/v1/rpc/public",
    },
  },
];
// Admin: 0x1d90546025045056c869a8cf548a38b69082e27a;
// Welcome: 0x409ca90802bf5848e35dc664c7f4afd60eabae2b;
// Newbie: 0x6d4589bb995e339bc82de062eb8af832ebeefc2f;
// Senior: 0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233;
// Alumnai: 0x14223fb38d9cc73b5e8daff4b36fd8b1c3ff3658;
