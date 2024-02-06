import { NETWORK_PACKAGE } from "@/config/constant";
import {SuiClient} from "@mysten/sui.js/client";
import { TransactionBlock } from "@mysten/sui.js/transactions";

type BankBalance = {  
    fields?: {
      balance: number
      admin_balance: number
    }  
}

export async function getBankBalance(client: SuiClient) {
  let data = await client.getObject({
    id: `${NETWORK_PACKAGE.testnet.bank_id}`,
    options:{
      showContent: true,
    }
  });
  let result = data.data?.content as unknown as BankBalance;
  console.log(result);
  return result.fields;
}

export async function createAccount(address:string){
  const txb = new TransactionBlock(); 
  let [account] = await txb.moveCall({
    target:`${NETWORK_PACKAGE.testnet.package_id}::bank::new_account`
  });
  txb.transferObjects([account],address);
  return txb;
}
