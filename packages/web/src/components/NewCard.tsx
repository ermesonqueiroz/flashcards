import { useMutation } from '@apollo/client'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  DrawerFooter,
  Button,
  FormErrorMessage,
  Select,
  Textarea
} from '@chakra-ui/react'
import { Formik, Form, Field, FormikProps, FieldProps } from 'formik'
import { useEffect } from 'react'
import { CREATE_CARD } from '../graphql/mutations/create-card'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useAppToast } from '../hooks/toast'
import { CardsActions } from '../lib/features/cards'
import { AddCardMutationResponse } from '../__generated__/graphql'

export interface NewCardProps {
  children: ({ onOpen }: { onOpen: () => void }) => React.ReactNode
}

export function NewCard({ children }: NewCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [addCard, { data, loading, error }] = useMutation<{ addCard: AddCardMutationResponse }>(CREATE_CARD)
  const toast = useAppToast()
  const dispatch = useAppDispatch()
  const decks = useAppSelector(state => state.decks)

  useEffect(() => {
    if (data?.addCard?.error || error) {
      toast({
        title: 'Não foi possível criar uma carta.',
        description: 'Por favor, tente novamente.',
        status: 'error',
      })
    }

    if (data?.addCard?.body) {
      dispatch(CardsActions.add(data?.addCard?.body))

      toast({
        title: 'Carta criada com sucesso.',
        status: 'success',
      })

      onClose()
    }
  }, [data])

  return (
    <>
      {children({ onOpen })}

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Nova carta</DrawerHeader>

          <DrawerBody>
            <Formik
              initialValues={{
                deckId: '',
                term: '',
                definition: '',
              }}
              onSubmit={async ({ deckId, definition, term }) => {
                await addCard({
                  variables: {
                    deckId,
                    definition,
                    term
                  }
                })
              }}
            >
              {(props: FormikProps<any>) => (
                <Form id="new-deck-form">
                  <FormControl isRequired>
                    <Field name="term">
                      {({ field, meta }: FieldProps<string>) => (
                        <>
                          <FormLabel>Termo</FormLabel>
                          <Input {...field} />
                          {meta.touched && meta.error && (
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          )}
                          <FormHelperText>
                            Preencha o termo a ser memorizado.
                          </FormHelperText>
                        </>
                      )}
                    </Field>

                    <Field name="definition">
                      {({ field, meta }: FieldProps<string>) => (
                        <>
                          <FormLabel mt={2}>Definição</FormLabel>
                          <Textarea {...field} />
                          {meta.touched && meta.error && (
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          )}
                          <FormHelperText>
                            Preencha a definição do termo a ser memorizado.
                          </FormHelperText>
                        </>
                      )}
                    </Field>

                    <Field name="deckId">
                      {({ field, meta }: FieldProps<string>) => (
                        <>
                          <FormLabel mt={2}>Coleção</FormLabel>
                          <Select {...field}>
                            <option value="">Selecione uma Coleção</option>
                            {decks.map((deck) => (
                              <option
                                key={deck.id}
                                value={deck.id}
                              >
                                {deck.title}
                              </option>
                            ))}
                          </Select>
                          {meta.touched && meta.error && (
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          )}
                          <FormHelperText>
                            Escolha a coleção que essa carta pertence.
                          </FormHelperText>
                        </>
                      )}
                    </Field>
                  </FormControl>
                </Form>
              )}
            </Formik>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="ghost"
              colorScheme="red"
              mr={4}
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button
              form="new-deck-form"
              colorScheme="blue"
              isLoading={loading}
              type="submit"
            >
              Pronto
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}