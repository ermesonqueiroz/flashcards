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
import { useAppDispatch } from '../hooks/redux'
import { useAppToast } from '../hooks/toast'
import { deckService } from '../lib/services/deck'
import { useLoading } from '../hooks/loading'

export interface NewDeckProps {
  children: ({ onOpen }: { onOpen: () => void }) => React.ReactNode
}

export function NewDeck({ children }: NewDeckProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useAppToast()
  const dispatch = useAppDispatch()

  const { loading, withLoading } = useLoading()

  const createDeck = withLoading(async (name: string) => {
    await deckService.create(name)
  })

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
                await createDeck(title)
                
                // if (data?.addDeck?.error || error) {
                //   return toast({
                //     title: 'Não foi possível criar uma coleção.',
                //     description: 'Por favor, tente novamente.',
                //     status: 'error',
                //   })
                // }

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