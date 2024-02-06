export const NETWORK_PACKAGE = {
  testnet: {
    package_id:
      "0x965169adcf1cbe417b7af94c15bd2108a8deab410bd052895384a28861e06632",
    bank_id:
      "0xbcf309e0328f04cef165c11f0fef9b40cb4b6c3ca23e89a15bea8f62488ad7be",
    owner_cap_id:
      "0xd867b548812d1a286dceb3494952151d8b839838136add2db6170b7830325d2d",
    cap_wrapper_id:
      "0xf5fc97f0f9085418a48af8b8f44dc6a04ac3daac2b7369139ff9863cf5bf1579",
  },
};

export const BANK_FUNCTIONS = {
    new_account:"::bank::new_account",
    balance:"::bank::balance",
    admin_balance:"::bank::admin_balance",
    user:"::bank::user",
    debt:"::bank::debt",
    account_deposit:"::bank::account_deposit",
    deposit:"::bank::deposit",
    withdraw:"::bank::withdraw",
    borrow:"::bank::borrow",
    repay:"::bank::repay",
    destroy_empty_account:"::bank::destroy_empty_account",
    claim:"::bank::claim",
    swap_sui:"::bank::swap_sui",
    swap_sui_dollar:"::bank::swap_sui_dollar",
}

// [
//   {
//     type: "package",
//     id: "0x965169adcf1cbe417b7af94c15bd2108a8deab410bd052895384a28861e06632",
//   },
//   {
//     type: "bank::Bank",
//     id: "0xbcf309e0328f04cef165c11f0fef9b40cb4b6c3ca23e89a15bea8f62488ad7be",
//   },
//   {
//     type: "bank::OwnerCap",
//     id: "0xd867b548812d1a286dceb3494952151d8b839838136add2db6170b7830325d2d",
//   },
//   {
//     type: "sui_dollar::CapWrapper",
//     id: "0xf5fc97f0f9085418a48af8b8f44dc6a04ac3daac2b7369139ff9863cf5bf1579",
//   },
// ];
