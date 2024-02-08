import { TransactionBlock } from "@mysten/sui.js/transactions";
import { OwnedObjectRef, SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import * as fs from "fs";
import { keypair, IObjectInfo, getId, IConfigInfo } from './utils.js';
import { execSync } from 'child_process';

type Network = "testnet" | "mainnet" | "devnet";

(async () => {
	console.log("publishing...")
	let network = process.argv[process.argv.indexOf('--network') + 1] as Network;
	if (!network) {
		network = "testnet";
	}

	const { modules, dependencies } = JSON.parse(
		execSync(`sui move build --dump-bytecode-as-base64 --path ${process.env.PACKAGE_PATH!}`, {
			encoding: 'utf-8',
		}),
	);
	
	const client = new SuiClient({ url: getFullnodeUrl(network) });
	try {
		const tx = new TransactionBlock();
		const [upgradeCap] = tx.publish({ modules, dependencies });
		tx.setGasBudget(1000000);
		tx.transferObjects([upgradeCap], keypair.getPublicKey().toSuiAddress());
		const result = await client.signAndExecuteTransactionBlock({
			signer: keypair,
			transactionBlock: tx,
			options: {
				showEffects: true,
			},
			requestType: "WaitForLocalExecution"
		});

		console.log("result: ", JSON.stringify(result, null, 2));

		// return if the tx hasn't succeed
		if (result.effects?.status?.status !== "success") {
			console.log("\n\nPublishing failed");
			return;
		}

		// get all created objects IDs
		const createdObjectIds = result.effects.created!.map(
			(item: OwnedObjectRef) => item.reference.objectId
		);

		// fetch objects data
		const createdObjects = await client.multiGetObjects({
			ids: createdObjectIds,
			options: { showContent: true, showType: true, showOwner: true }
		});

		const objects: IObjectInfo[] = [];
		createdObjects.forEach((item) => {
			if (item.data?.type === "package") {
				objects.push({
					type: "package",
					id: item.data?.objectId,
				});
			} else if (!item.data!.type!.startsWith("0x2::")) {
				objects.push({
					type: item.data?.type!.slice(68),
					id: item.data?.objectId,
				});
			}
		});
		const config: IConfigInfo = {
			network: network,
			packages: objects
		}

		fs.writeFileSync('./created.json', JSON.stringify(config, null, 2));

	} catch (e) {
		console.log(e);
	} finally {
		console.log("\n\nSuccessfully deployed at: " + getId("package"));
	}
})()