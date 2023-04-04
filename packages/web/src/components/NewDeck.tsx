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
  FormErrorMessage
} from '@chakra-ui/react'
import { Formik, Form, Field, FormikProps, FieldProps } from 'formik'
import { useEffect } from 'react'
import { CREATE_DECK } from '../graphql/mutations/create-deck'
import { useAppDispatch } from '../hooks/redux'
import { useAppToast } from '../hooks/toast'
import { DecksActions } from '../lib/features/decks'
import { AddDeckMutationResponse } from '../__generated__/graphql'

export interface NewDeckProps {
  children: ({ onOpen }: { onOpen: () => void }) => React.ReactNode
}

export function NewDeck({ children }: NewDeckProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [addDeck, { data, loading, error }] = useMutation<{ addDeck: AddDeckMutationResponse }>(CREATE_DECK)
  const toast = useAppToast()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data?.addDeck?.body)
      dispatch(DecksActions.add(data?.addDeck?.body))
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
          <DrawerHeader>Nova coleção</DrawerHeader>

          <DrawerBody>
            <Formik
              initialValues={{
                title: ''
              }}
              onSubmit={async ({ title }) => {
                await addDeck({
                  variables: {
                    title
                  }
                })
                
                if (data?.addDeck?.error || error) {
                  return toast({
                    title: 'Não foi possível criar uma coleção.',
                    description: 'Por favor, tente novamente.',
                    status: 'error',
                  })
                }

                toast({
                  title: 'Coleção criada com sucesso.',
                  status: 'success',
                })

                onClose()
              }}
            >
              {(props: FormikProps<any>) => (
                <Form id="new-deck-form">
                  <Field name="title">
                    {({ field, meta }: FieldProps<string>) => (
                      <FormControl isRequired>
                        <FormLabel>Título</FormLabel>
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