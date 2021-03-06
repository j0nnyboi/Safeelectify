import { Market } from '@project-serum/serum';
import { PublicKey, Connection } from '@safecoin/web3.js';

export async function get_bids(marketAddress: String) {
	let connection = new Connection('https://api.devnet.safecoin.org')
	let marketpubkey = new PublicKey(marketAddress);
	let programAddress = new PublicKey('8s5qFsS2fdPyBu4rkcunM6kboajdaLaAmE3xJZ1qkwG1');
	let market = await Market.load(connection, marketpubkey, {}, programAddress);

	let encoded = await market.loadBids(connection);
	let bids = [...encoded]
	let list = bids.map(value => value.openOrdersAddress.toBase58())
	console.log(list)
	let prices = bids.map(value => value.price)
	let sizes = bids.map(value => value.size)
	let sides = bids.map(value => value.side)

	const data = {
		"jsonrpc": "2.0",
		"id": 1,
		"method": "getMultipleAccounts",
		"params": [
			list,
			{
				"dataSlice": {
					"offset": 45,
					"length": 32,
				}
			}
		]
	}
	let result = []
	await fetch("https://api.devnet.safecoin.org", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
	}).then(res => res.json())
		.then((data) => {
			let i = 0
			for (const obj of data.result.value) {
				let bytes = Buffer.from(obj.data[0], 'base64')
				let pubkey = new PublicKey(bytes)
				result.push({ pubkey: pubkey.toBase58(), side: sides[i], size: sizes[i], price: prices[i] })
				i++
			}
		})
	return result

}
