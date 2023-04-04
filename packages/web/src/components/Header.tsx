import { Flex, Heading, Spacer, IconButton, useColorMode } from '@chakra-ui/react'
import { SettingsIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      px={10}
      py={4}
      alignItems="center"
    >
      <Heading
        as={Link}
        fontSize="2xl"
        to="/"
        fontWeight="regular"
        textDecoration="underline"
      >
        memorize
      </Heading>

      <Spacer />

      <Flex gap={2}>
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          variant="ghost"
          colorScheme="gray"
          onClick={toggleColorMode}
        />

        <IconButton
          aria-label="User settings"
          icon={<SettingsIcon />}
          variant="ghost"
          colorScheme="gray"
        />
      </Flex>
    </Flex>
  )
}