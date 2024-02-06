"use client"
import { ConnectButton } from "@mysten/dapp-kit";
import Image from "next/image";
import "@mysten/dapp-kit/dist/index.css"

const Navbar = () => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center m-5">
          <div className="flex items-center justify-center w-10 h-10 mr-2 bg-yellow-400 rounded-full">
            <Image src={"/next.svg"} alt="logo" width={"30"} height={"30"}/>
          </div>
          <span className="text-xl font-bold text-gray-800">Web Bank</span>
        </div>
        <div className="mr-5">
          <ConnectButton/>
        </div>
      </div>
    );
}

export default Navbar;