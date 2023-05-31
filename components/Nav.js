"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {

    const { data: session } = useSession()

    const [providers, setProviders] = useState(null);
    const [toggleDropwdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        setUpProviders();
    }, [])


    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href='/' className="flex gap-2 flex-center">
                <Image
                    src='/assets/images/rank-logo.svg'
                    alt='RankR logo'
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="header_text blue_gradient ms-1 mt-1">RankR</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-group" className="blue_btn">
                            Create Group
                        </Link>

                        <button type="button" onClick={signOut} className="outline_btn">
                            Sign Out
                        </button>


                        <Link href="/profile">
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile image"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="blue_btn"
                            >
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>

            {/* Moible Navigation */}

            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />

                        {toggleDropwdown && (
                            <div className="dropdown">
                                <Link
                                href="/profile"
                                className="dropdown_link"
                                onClick={() => setToggleDropdown(false)}
                                >  
                                Profile
                                </Link>
                                <Link
                                href="/create-group"
                                className="dropdown_link"
                                onClick={() => setToggleDropdown(false)}
                                >  
                                Create Group
                                </Link>

                                <button 
                                type="button"
                                onClick={() => {setToggleDropdown(false);
                                signOut();
                                }}
                                className="mt-5 w-full blue_btn">
                                    Sign Out
                                </button>
                            </div>
                        )}

                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className="blue_btn"
                            >
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>

        </nav>
    )
}

export default Nav