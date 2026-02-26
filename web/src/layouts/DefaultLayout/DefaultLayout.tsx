import { useState } from 'react'

import { LogOut, Menu, Speech } from 'lucide-react'
import { XIcon } from 'lucide-react'
import type {
  CreateFeedbackMutation,
  CreateFeedbackInput,
  CreateFeedbackMutationVariables,
} from 'types/graphql'

import { Link, routes } from '@cedarjs/router'
import { useMutation } from '@cedarjs/web'
import type { TypedDocumentNode } from '@cedarjs/web'
import { toast } from '@cedarjs/web/toast'

import { useAuth } from 'src/auth'
import FeedbackForm from 'src/components/Feedback/FeedbackForm'
import { Button } from 'src/components/ui/button'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from 'src/components/ui/menubar'
import { ModeCycle } from 'src/components/ui/mode-cycle'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from 'src/components/ui/sheet'

const CREATE_FEEDBACK_MUTATION: TypedDocumentNode<
  CreateFeedbackMutation,
  CreateFeedbackMutationVariables
> = gql`
  mutation CreateFeedbackMutation($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      id
    }
  }
`

type DefaultLayoutProps = {
  children?: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { isAuthenticated, logOut, currentUser } = useAuth()
  const [feedbackSheetOpen, setFeedbackSheetOpen] = useState(false)
  const [feedbackFormData, setFeedbackFormData] = useState({
    subject: '',
    feedback: '',
  })
  const isAdmin = currentUser?.roles?.includes('admin')

  const [createFeedback, { loading: feedbackLoading, error: feedbackError }] =
    useMutation(CREATE_FEEDBACK_MUTATION, {
      onCompleted: () => {
        toast.success('Feedback sent!')
        setFeedbackSheetOpen(false)
        setFeedbackFormData({ subject: '', feedback: '' })
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  const handleFeedbackSave = (input: any) => {
    // Extract only the fields needed for CreateFeedbackInput
    const feedbackInput: CreateFeedbackInput = {
      subject: input.subject,
      feedback: input.feedback,
      slug: input.slug,
      status: input.status || 'unassigned',
    }
    createFeedback({ variables: { input: feedbackInput } })
  }

  const handleFeedbackFormChange = (subject: string, feedback: string) => {
    setFeedbackFormData({ subject, feedback })
  }

  const menuItems = [
    { label: 'Login', to: routes.login() },
    { label: 'Signup', to: routes.signup() },
  ]

  const userMenuItems = [
    // { label: 'Dashboard', to: routes.dashboard() },
    { label: 'Locations', to: routes.locations() },
  ]

  const adminMenuItems = [
    { label: 'Locations', to: routes.locations() },
    { label: 'Feedback', to: routes.feedbacks() },
  ]

  return (
    <>
      <header>
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <Link to={routes.home()} className="text-lg font-semibold">
              Verdant Vault
            </Link>

            <Menubar>
              <MenubarMenu>
                <MenubarTrigger aria-label="Open menu">
                  <Menu />
                </MenubarTrigger>

                <MenubarContent align="end">
                  {isAuthenticated ? (
                    <>
                      {(isAdmin ? adminMenuItems : userMenuItems).map(
                        (item) => (
                          <MenubarItem key={item.label} asChild>
                            <Link to={item.to}>{item.label}</Link>
                          </MenubarItem>
                        )
                      )}
                      <MenubarItem asChild>
                        <button className="w-full" onClick={logOut}>
                          <LogOut />
                          Logout
                        </button>
                      </MenubarItem>
                    </>
                  ) : (
                    <>
                      {menuItems.map((item) => (
                        <MenubarItem key={item.label} asChild>
                          <Link to={item.to}>{item.label}</Link>
                        </MenubarItem>
                      ))}
                    </>
                  )}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 my-4">{children}</main>

      <footer className="my-8">
        <div className="flex items-center justify-center max-w-2xl mx-auto px-4 py-6 gap-4 flex-col md:flex-row">
          <span className="flex md:order-last">
            &copy; {new Date().getFullYear()} Verdant Vault
          </span>
          <ModeCycle></ModeCycle>

          {isAuthenticated && (
            <Sheet open={feedbackSheetOpen} onOpenChange={setFeedbackSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Speech className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full sm:w-[540px] overflow-y-auto"
              >
                <SheetTitle className="mt-4 ml-4 text-xl">
                  Give Feedback
                </SheetTitle>
                <SheetClose></SheetClose>
                <div className="flex flex-col gap-6 p-4 h-full">
                  <div>
                    <FeedbackForm
                      onSave={handleFeedbackSave}
                      error={feedbackError}
                      loading={feedbackLoading}
                      initialSubject={feedbackFormData.subject}
                      initialFeedback={feedbackFormData.feedback}
                      onFormChange={handleFeedbackFormChange}
                    />
                  </div>
                  <div className="mt-auto">
                    <Button asChild variant="outline" size="sm">
                      <Link to={routes.feedbacks()}>My Feedback</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </footer>
    </>
  )
}

export default DefaultLayout
