"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {

    const isUserLoggedIn = true;

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
            {isUserLoggedIn ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-group" className="blue_btn">
                        Create Group
                    </Link>

                    <button type="button" onClick={signOut} className="outline_btn">
                        Sign Out
                    </button>
                    
                </div>
            ): (
                <>

                </>
            )}
        </div>
    </nav>
  )
}

export default Nav