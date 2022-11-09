import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import { Buffer } from 'buffer';
import { create as ipfsHttpClient } from 'ipfs-http-client'
//const auth = `Basic ${Buffer.from(`${process.env.PROJECT_ID}:${process.env.PROJECT_SECRET}`).toString('base64')}`;
const auth = `Basic ` + Buffer.from(`2HHvP56MD01LQkNZornTEJ58ZrT:e10d6dfef058dd1001814f2bba44340c`).toString(`base64`);
const options = {
  host: 'ipfs.infura.io',
  protocol: 'https',
  port: 5001,
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  },
};
const dedicatedEndpoint = 'https://ece-marketplace.infura-ipfs.io'
const client = ipfsHttpClient(options);

const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add({ content: file })
        console.log(result)
        console.log(result.path)
        setImage(`${dedicatedEndpoint}/ipfs/${result.path}`)
      } catch (error) {
        console.log("ipfs image upload error: ", error)
      }
    }
  }
  const createNFT = async () => {
    if (!image || !price || !name || !description) return
    try {
      const result = await client.add(JSON.stringify({ image, price, name, description }))
      console.log(result);
      mintThenList(result)
    } catch (error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const mintThenList = async (result) => {
    const uri = `${dedicatedEndpoint}/ipfs/${result.path}`
    // mint nft 
    await (await nft.mint(uri)).wait()
    // get tokenId of new nft 
    const id = await nft.tokenCount()
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait()
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString())
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait()
  }
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
              <div className="d-grid px-0">
                <Button onClick={createNFT} variant="primary" size="lg">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Create