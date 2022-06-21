const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers, network } = require('hardhat');
const Web3 = require('web3');

/**
 * We assume loan currency is native coin
 */
describe('SolRsaVerify', function () {
  before(async function () {
    this.SolRsaVerify = await ethers.getContractFactory('SolRsaVerify');
  });

  beforeEach(async function () {
    this.solRsaVerify = await (
      await this.SolRsaVerify.deploy()
    ).deployed();
  });

  it('RSA signature', async function () {
    const msg = 'hello world';
    const hexMsg1 = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(msg));

    const web3 = new Web3();
    const hexMsg2 = web3.utils.asciiToHex(msg);

    const sha256 = await this.solRsaVerify.returnSHA256(hexMsg1);
    console.log('sha256 ==>', sha256);

    // const modulus = "0xB793F2F926170FAD768F8B1A5769A2243B4CDCAC4780194F59B39E1A2ABC3BB8EA42DB495D17BEC7F7072A11ED4FA510E75A7886A5DB6F71B7AFCA0090CA079889D18AF0669829ED29A8E21D0C09BD19CAAF2FE2CC8121BFC5687AC6698E3022F468A481426486CAD263BE1A119491E034A6E1AB78F19C066D4145A50F9ECFF7";
    // const exponent= "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001";
    // const signature = "0x57a0d6a185924d9d579b3ab319fe512331cb0bc6ef2da7d5285cbd06844f5c44662cae2e41ee5020893d6690e34b50a369a78250ae81ba6d708560535ef7cff0299f2ba070b096a9a76e84cf9c902b5e367b341ee166f5fc325dd08a3d971d96d528937f617a1eaf2250c56c4edca80c65970d54fe2492a19468bd32166b3c32";

    const modulus = "0xFAEEFC2BE95C7BD5FA106BF2304D2FF1471310C303AAF05B1C68BB205564E3B7195C162002B3BB2D529AEFBD48FB810A978F047F87978DCC28680A56692A396ECF92A69BE1B78031ECB0FE0B0E4B37FC1837A7696499A30142F435745D15ADDE7A1201C6DA20FF797A9B1492464BB6FDB18BBF50AFCC48881566EC1CD3298795";
    const exponent= "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001";
    const signature = "0x1cf96164b68c76598e618d3fb70599e9360f143f274a5a19616068482afb4ab9529e59457fee16b60494dfcfbbc637cb8af5ba6396afc1851158909382cb4294269778085ba3c4cba01aba3ed44599f9f3e64da57750e78c2c38bd3f2f03984d62b6506252f612e43d4d1040ae4da685b050fe27d9cb6457f8269cf17d385536";

    const result = await this.solRsaVerify.pkcs1Sha256VerifyRaw(hexMsg2, signature, exponent, modulus);

    console.log('result', result.toString());
  });
});
