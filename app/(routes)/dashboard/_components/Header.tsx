import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface kindUserType {
    id: string;
    email: string | null;
    given_name?: string | null;
    family_name?: string | null;
    picture?: string | null;
}

function Header() {
    const { user } = useKindeBrowserClient();

    if (!user) {
        return null; // or return a loading/error state
    }

    return (
        <div className='flex justify-end w-full gap-2 items-center'>
            <div className='flex gap-2 items-center border rounded-md p-1'>
                <Search className='h-4 w-4 ' />
                <input type='text' placeholder='Search' />
            </div>
            {user.picture && (
                <div>
                    <Image
                        src={user.picture}
                        alt='user profile'
                        width={50}
                        height={50}
                        className='rounded-full'
                    />
                </div>
            )}
            <Button className='gap-2 flex text-sm
            h-8 hover:bg-blue-700 bg-blue-600
            '> <Send className='h-4 w-4' /> Invite</Button>
        </div>
    )
}

export default Header
