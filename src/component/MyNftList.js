import { useContext, useEffect, useState } from 'react'
import {
  Box,
  Center,
  Heading
} from '@chakra-ui/react'

import { Web3Context } from 'web3-hooks'
import { SmartWordsContext } from '../App'

function MyNftList(props) {
  const { nftTokenBalance } = props
  const [web3State] = useContext(Web3Context)
  const smartWords = useContext(SmartWordsContext)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (smartWords) {
      const nftList = async () => {
        let id, title, textHash
        /*
        let nft = []
        let myNft = []
        */
        try {
          setIsLoading(true)
          for (let index = 0; index < nftTokenBalance; index++) {
            id = Number(await smartWords.tokenOfOwnerByIndex(web3State.account, index))
            title = await smartWords.getTitleOf(id)
            textHash = await smartWords.getTextHashOf(id)
          }
        } catch (e) {
          setError(true)
          console.log(e)
        } finally {
          setIsLoading(false)
        }
      }
      nftList()
    }
  }, [smartWords, web3State.account, nftTokenBalance])



  return (
    <>
      <Center border="1px" borderRadius="lg" borderColor="dark" bg="blue" color="white" w="600px" my="3" mx="1" p="2">
        <Heading px="2" size="xl" >My NFT</Heading>
      </Center>
      <Box pb="20px" h="auto" w="100%">
        {isLoading && <Center>loading...</Center>}
        {error && <p>{error}</p>}
        {!isLoading && <Center>In progress</Center>}
        <ul>
        </ul>
      </Box>
    </>
  )
}

export default MyNftList

/*
 {fonts.map((font) => {
            return <li></li>
          })}
*/
