"use client";

import { createAccount } from "@/actions/bank";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useCurrentAccount,
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from "@mysten/dapp-kit";

const ControlCard = () => {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const { mutate: signAndExecuteTransactionBlock } =
    useSignAndExecuteTransactionBlock();
  const handleClick = async () => {
    let txb = await createAccount(account?.address!);
    signAndExecuteTransactionBlock({
      transactionBlock: txb,
      options: {
        showEffects: true,
      },
    });
  };
  const hadleCheckUser = async () => {
    let result = await client
      .getOwnedObjects({
        owner: account?.address!,
        options: {
          showContent: true,
        },
      })
      .then((res) => {
        return res.data.filter((item) => {
          //@ts-ignore
          let type = item.data?.content.type as string;
          return type.includes("bank::Account");
        });
      });
    console.log(result);
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Deposit & Withdraw</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <p>Card Content</p>
          <button onClick={() => handleClick()}>createAccount</button>
          <button onClick={() => hadleCheckUser()}>Check User</button>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ControlCard;
