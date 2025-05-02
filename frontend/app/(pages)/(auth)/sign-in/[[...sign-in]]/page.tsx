import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='flex items-center justify-center h-screen w-sc bg-gray-100'>
      <SignIn fallbackRedirectUrl={"/chats"}/>

  </div>
}