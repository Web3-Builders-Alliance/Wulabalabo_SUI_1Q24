"use client"

import { getBankBalance } from "@/actions/bank";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SuiClient } from "@mysten/sui.js/client";
import { useEffect, useState } from "react";

type DataCardProps = {
  client: SuiClient;
};

const DataCard = ({ client }: DataCardProps) => {
  let [balance, setBalance] = useState(0);
  let [adminBalance, setAdminBalance] = useState(0);
  useEffect(() => {
    if (client) {
      getBankBalance(client).then((res) => {
        setBalance(res!.balance);
        setAdminBalance(res!.admin_balance);
      });
    }},[]);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Bank Balance</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Balance:{balance}</p>
          <p>Admin_Balance:{adminBalance}</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataCard;
