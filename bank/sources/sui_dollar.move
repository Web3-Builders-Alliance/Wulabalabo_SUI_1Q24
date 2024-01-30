module bank::sui_dollar {
  use std::option;
  use sui::transfer;
  use sui::object::{Self, UID};
  use sui::tx_context::TxContext;
  use sui::coin::{Self, Coin, TreasuryCap};
  use sui::url::{Self};

  struct SUI_DOLLAR has drop {}

  friend bank::bank;

  struct CapWrapper has key {
    id: UID,
    cap: TreasuryCap<SUI_DOLLAR>
  }

  #[lint_allow(share_owned)]
  fun init(witness: SUI_DOLLAR, ctx: &mut TxContext) {
      let (treasury_cap, metadata) = coin::create_currency<SUI_DOLLAR>(
            witness, 
            9, 
            b"SUID",
            b"Sui Dollar", 
            b"Stable coin issued by Sui Bank", 
            option::some(url::new_unsafe_from_bytes(b"https://bafybeih556vwr4yrhodbtrqonow37y7tqpnsz2vhrma2oqo6a2rm2f35jq.ipfs.w3s.link/sui_dollar_100.png")),
            ctx
        );

      transfer::share_object(CapWrapper { id: object::new(ctx), cap: treasury_cap });
      transfer::public_share_object(metadata);
  }

  public fun burn(cap: &mut CapWrapper, coin_in: Coin<SUI_DOLLAR>): u64 {
    coin::burn(&mut cap.cap, coin_in)
  }

  public(friend) fun mint(cap: &mut CapWrapper, value: u64, ctx: &mut TxContext): Coin<SUI_DOLLAR> {
    coin::mint(&mut cap.cap, value, ctx)
  }
}