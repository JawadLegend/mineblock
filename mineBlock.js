const SHA256 = require("crypto-js/sha256")
const TARGET_DIFFICULTY = BigInt(0x0ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff)
const MAX_TRANSACTION = 10

const blocks = []
const mempool = []

function addTransaction(transaction) {
    //transactions are kept in the mempool before miners add them to blockchain
    mempool.push(transaction)
}

function mine() {
    const height = blocks.length

    const newBlock = {
        id: height,
        transactions: [],
        nonce: 0,
    }

    for (let i = 0; i < MAX_TRANSACTION && mempool.length > 0; i++) {
        const transaction = mempool.pop()
        newBlock.transactions.push(transaction)
    }

    const stringfyObj = JSON.stringify(newBlock)

    while (true) {
        newBlock.hash = SHA256(stringfyObj + newBlock.hash).toString()
        if (BigInt("0x" + newBlock.nonce) < TARGET_DIFFICULTY) {
            break
        }
        newBlock.nonce++
    }

    return blocks.push(newBlock)
}

module.exports = {
    addTransaction,
    mine,
    TARGET_DIFFICULTY,
    SHA256,
    mempool,
    blocks,
}
