import React from 'react'

import {
  Html,
  Text,
  Hr,
  Body,
  Head,
  Tailwind,
  Preview,
  Container,
  Heading,
  Button,
} from '@react-email/components'

interface ForgotPasswordEmailProps {
  resetLink: string
}

export function ForgotPasswordEmail({ resetLink }: ForgotPasswordEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Reset your Verdant Vault password</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] rounded border border-solid border-gray-200 p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Reset Your Password
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hi there,
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              We received a request to reset your Verdant Vault password. Click
              the link below to create a new password (expires in 24 hours).
            </Text>
            <div className="my-[30px] text-center">
              <Button
                href={resetLink}
                className="rounded bg-blue-600 px-4 py-2 text-center text-[14px] font-semibold text-white"
              >
                Reset Password
              </Button>
            </div>
            <Text className="text-[14px] leading-[24px] text-black">
              Or copy and paste this link into your browser:
            </Text>
            <Text className="text-[12px] leading-[24px] text-blue-600 break-all">
              {resetLink}
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              If you didn&apos;t request a password reset, you can safely ignore
              this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
