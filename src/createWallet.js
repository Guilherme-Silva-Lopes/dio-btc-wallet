// Importando as dependencias
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

(async () => {
    try {
        // Definir a rede
        // bitcoin = rede principal = mainnet
        // testnet = rede de teste = testnet
        const network = bitcoin.networks.testnet;

        // Derivação de endereço de carteiras HD
        const path = "m/49'/1'/0'/0'";

        // Criando as palavras mnemonic para (palavras de senha)
        let mnemonic = bip39.generateMnemonic();
        const seed = await bip39.mnemonicToSeed(mnemonic);

        // Criando a raiz da carteira HD
        let root = bip32.fromSeed(seed, network);

        // Criando uma conta = par de pvt-pub keys
        let account = root.derivePath(path);
        let node = account.derive(0).derive(0);

        let btcAdress = bitcoin.payments.p2pkh({
            pubkey: node.publicKey,
            network: network,
        }).address;

        console.log("Carteira gerada");
        console.log("Endereço: ", btcAdress);
        console.log("Chave privada ", node.toWIF());
        console.log("Seed", mnemonic);
    } catch (error) {
        console.error("Erro ao gerar a carteira:", error);
    }
})();
