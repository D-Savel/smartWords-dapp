import Header from './Header'
import Footer from './Footer'
import MyNftList from './MyNftList'
import CreateNFT from './CreateNFT'
import { useContext, useState } from 'react'
import { Web3Context } from 'web3-hooks'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link as ReachLink } from 'react-router-dom'
import {
  Box,
  Link,
  Center,
  VStack,
  HStack,
} from '@chakra-ui/react'

function Dapp() {
  const [web3State] = useContext(Web3Context)
  const [nftTokenBalance, setNftTokenBalance] = useState(0)

  return (
    <>
      <Router>
        <Box position="sticky" w="100%" top="0" zIndex="sticky">
          <HStack as="nav" bg="gray.300" py="1">
            <Link as={ReachLink} to={'/'} ml="2" px="5"> Create my NFT </Link>
            <Link as={ReachLink} to={'/MyNftList'} px="5">My NFT List</Link>
          </HStack>
          <Header nftTokenBalance={nftTokenBalance} setNftTokenBalance={setNftTokenBalance} />
        </Box>
        <VStack>
          {!web3State.isLogged || web3State.networkName !== 'Kovan' ?
            <>

              <Center px="2" my="20" w="75%" py="12" bg="red.500" fontSize="20" color="white">Vous devez vous connecter à MetaMask sur le TestNet Kovan</Center>
            </> :
            <>
              <Switch>
                <Route exact path='/' component={CreateNFT} />
                <Route
                  path='/MyNftList'
                  component={() => <MyNftList nftTokenBalance={nftTokenBalance} setNftTokenBalance={setNftTokenBalance} />}

                />
              </Switch>
            </>
          }
        </VStack>
      </Router>
      < Footer />
    </>
  )
}

export default Dapp
