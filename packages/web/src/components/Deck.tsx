import { useMutation } from '@apollo/client'
import {
  Card,
  CardBody,
  Flex,
  Heading,
  Spacer,
  IconButton,
  Text,
  CardProps,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Input,
  FormControl,
  FormLabel,
  ModalHeader,
  ModalFooter,
  FormErrorMessage,
  FormHelperText,
  Progress,
  Box
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik'
import { EditIcon, MoreHorizontalIcon, Trash2Icon } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { DELETE_DECK } from '../graphql/mutations/delete-deck'
import { RENAME_DECK } from '../graphql/mutations/rename-deck'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useAppToast } from '../hooks/toast'
import { DecksActions } from '../lib/features/decks'
import { DeleteDeckMutationResponse, RenameDeckMutationResponse } from '../__generated__/graphql'

export interface DeckProps extends CardProps {
  id: string
  title: string
  termsLength: number
  termsToReview: number
}

export interface DeleteDeckDialogProps {
  children: ({ onOpen }: { onOpen: () => void }) => React.ReactNode
  deckId: string
}

export interface RenameDeckDialogProps {
  children: ({ onOpen }: { onOpen: () => void }) => React.ReactNode
  deckId: string
  title: string
}

export interface DeckSettingsProps {
  deckId: string
  title: string
}

function DeleteDeckDialog({ children, deckId: id }: DeleteDeckDialogProps) {
  const [deleteDeck, { loading, error, data }] = useMutation<{ deleteDeck: DeleteDeckMutationResponse }>(DELETE_DECK)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const cancelRef = useRef(null)
  const toast = useAppToast()
  const dispatch = useAppDispatch()

  async function deleteDeckHandle() {
    await deleteDeck({
      variables: {
        id
      }
    })

    if (error || data?.deleteDeck?.error) {
      return toast({
        title: 'Não foi possível excluir a coleção.',
        description: 'Por favor, tente novamente.',
        status: 'error',
      })
    }

    dispatch(DecksActions.delete({ id }))

    toast({
      title: 'Coleção excluída com sucesso.',
      status: 'success',
    })

    onClose()
  }

  return (
    <>
      {children({ onOpen })}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
            >
              Excluir coleção?
            </AlertDialogHeader>
            <AlertDialogBody>
              Tem certeza disso? Essa ação é irreversível.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                variant="ghost"
              >
                Cancelar
              </Button>

              <Button
                colorScheme="red"
                onClick={deleteDeckHandle}
                ml={3}
                isLoading={loading}
              >
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

function RenameDeckDialog({ children, deckId: id, title }: RenameDeckDialogProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [renameDeck, { loading, error, data }] = useMutation<{ renameDeck: RenameDeckMutationResponse }>(RENAME_DECK)
  const toast = useAppToast()
  const dispatch = useAppDispatch()

  return (
    <>
      {children({ onOpen })}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Renomear coleção</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{
                title
              }}
              onSubmit={async ({ title: newTitle }) => {
                await renameDeck({
                  variables: {
                    id,
                    title: newTitle
                  }
                })

                if (data?.renameDeck?.error || error) {
                  return toast({
                    title: 'Não foi possível renomear a coleção.',
                    description: 'Por favor, tente novamente.',
                    status: 'error',
                  })
                }

                dispatch(
                  DecksActions.rename({
                    id,
                    title: newTitle
                  })
                )

                toast({
                  title: 'Coleção renomeada com sucesso.',
                  status: 'success',
                })

                onClose()
              }}
            >
              {(props: FormikProps<any>) => (
                <Form id="rename-deck-form">
                  <Field name="title">
                    {({ field, meta }: FieldProps<string>) => (
                      <FormControl isRequired>
                        <FormLabel>Novo título</FormLabel>
                        <Input {...field} />
                        {meta.touched && meta.error && (
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        )}
                        <FormHelperText>
                          Tente usar algo que categorize
                          as cartas que serão inseridas na coleção.
                        </FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              variant="ghost"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              colorScheme="blue"
              onClick={onClose}
              ml={3}
              isLoading={loading}
              form="rename-deck-form"
            >
              Renomear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function DeckSettings({ title, deckId }: DeckSettingsProps) {
  return (
    <Menu>
      <MenuButton>
        <IconButton
          aria-label="Card settings"
          icon={<MoreHorizontalIcon />}
          variant="ghost"
          colorScheme="gray"
          size="sm"
        />
      </MenuButton>
      <MenuList>
        <RenameDeckDialog
          deckId={deckId}
          title={title}
        >
          {({ onOpen }) => (
            <MenuItem onClick={onOpen}>
              <Flex
                gap={4}
                alignItems="center"
              >
                <EditIcon size={20}/>
    
                <Text size="xs">Renomear</Text> 
              </Flex>
            </MenuItem>
          )}
        </RenameDeckDialog>

        <DeleteDeckDialog deckId={deckId}>
          {({ onOpen }) => (
            <MenuItem onClick={onOpen}>
              <Flex
                gap={4}
                alignItems="center"
                color="red.400"
              >
                <Trash2Icon size={20}/>

                <Text size="xs">Excluir</Text> 
              </Flex>
            </MenuItem>
          )}
        </DeleteDeckDialog>
      </MenuList>
    </Menu>
  )
}

export function Deck({ id, title, termsLength, termsToReview }: DeckProps) {
  const cards = useAppSelector(
    (state) => state.cards.filter(({ deckId }) => id === deckId)!
  )

  return (
    <Card
      direction="row"
      variant="filled"
      size="md"
      w="full"
      maxW="370px"
    >
      <CardBody>
        <Flex
          alignItems="center"
          gap={2}
        >
          <Heading
            size="md"
            as={termsToReview > 0 ? Link : "h2"}
            {...{
              to: termsToReview > 0 ? `/deck/${id}` : undefined
            }}
          >
            {title}
          </Heading>

          <Spacer />

          <DeckSettings
            deckId={id}
            title={title}
          />
        </Flex>

        <Box>
          {termsLength > 0 ? (
            <>
              <Text fontSize="sm">
                {
                  termsToReview > 1
                    ? `Você tem ${termsToReview} cartas para revisar`
                    : termsToReview === 1
                      ? `Você tem ${termsToReview} carta para revisar`
                      : `Você não tem nenhuma carta para revisar`
                }  
              </Text>
            </>
          ) : (
            <Text>
              Essa coleção não possui nenhuma carta
            </Text>
          )}
        </Box>
      </CardBody>
    </Card>
  )
}
