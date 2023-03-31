import React from 'react'

export default function DemoUserChats({ setShowChats }: {setShowChats: React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <div className="w-full bg-white rounded-2xl scale-up-ver-top">
            
    <ul>
        <li className="flex items-center my-6 space-x-2">
            <a href="#" className="relative block">
                <img alt="profil" src="/africa.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
            </a>
            <div className="flex flex-col">
                <span className="ml-2 text-sm font-semibold text-gray-900">
                    Charlie Rabiller
                </span>
                <span className="ml-2 text-sm text-gray-400">
                    Hey John ! Do you read the NextJS doc ?
                </span>
            </div>
        </li>
        <li className="flex items-center my-6 space-x-2">
            <a href="#" className="relative block">
                <img alt="profil" src="/africa.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
            </a>
            <div className="flex flex-col">
                <span className="ml-2 text-sm font-semibold text-gray-900">
                    Marie Lou
                </span>
                <span className="ml-2 text-sm text-gray-400">
                    No I think the dog is better...
                </span>
            </div>
        </li>
        <li className="flex items-center my-6 space-x-2">
            <a href="#" className="relative block">
                <img alt="profil" src="/africa.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
            </a>
            <div className="flex flex-col">
                <span className="ml-2 text-sm font-semibold text-gray-900">
                    Ivan Buck
                </span>
                <span className="ml-2 text-sm text-gray-400">
                    Seriously ? haha Bob is not a child !
                </span>
            </div>
        </li>
        <li className="flex items-center my-6 space-x-2">
            <a href="#" className="relative block">
                <img alt="profil" src="/africa.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
            </a>
            <div className="flex flex-col">
                <span className="ml-2 text-sm font-semibold text-gray-900">
                    Marina Farga
                </span>
                <span className="ml-2 text-sm text-gray-400">
                    Do you need that design ?
                </span>
            </div>
        </li>
        <li className="flex items-center my-6 space-x-2">
            <button className='text-sm w-full hover:underline text-gray-700' onClick={() => setShowChats(true)}>Voir plus de disscussions</button>
        </li>
    </ul>
</div>
  )
}
