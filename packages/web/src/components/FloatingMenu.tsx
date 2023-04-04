import { Box, Menu, MenuButton, MenuList, MenuItem, Button, Flex, Text} from '@chakra-ui/react'
import { PlusIcon, BookIcon, FileIcon,  } from 'lucide-react'
import { NewCard } from './NewCard'
import { NewDeck } from './NewDeck'

export function FloatingMenu() {
  return (
    <Box
      position="fixed"
      bottom={10}
      right={10}
    >
      <Menu>
        <MenuButton
          bg="ActiveCaption"
          color="Background"
          p={3}
          rounded="full"
        >
          <PlusIcon />
        </MenuButton>

        <MenuList>
          <NewDeck>
            {({ onOpen }) => (
              <MenuItem onClick={onOpen}>
                <Flex
                  gap={4}
                  alignItems="center"
                >
                  <BookIcon />

                  <Text>Criar Coleção</Text>
                </Flex>
              </MenuItem>
            )}
          </NewDeck>

          <NewCard>
            {({ onOpen }) => (
              <MenuItem onClick={onOpen}>
                <Flex
                  gap={4}
                  alignItems="center"
                >
                  <FileIcon />
    
                  <Text>Criar Carta</Text> 
                </Flex>
              </MenuItem>
            )}
          </NewCard>
        </MenuList>
      </Menu>
    </Box>
  )
}