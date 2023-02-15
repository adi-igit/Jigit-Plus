/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { SlBag } from 'react-icons/sl';
import { AiOutlineMenu } from 'react-icons/ai';
import SideDrop from './SideDrop';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, useScroll } from 'framer-motion';
import { Menu } from '@headlessui/react';

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const { data: session } = useSession();

  const links = [
    { href: '/account-settings', label: 'Account settings' },
    { href: '/support', label: 'Support' },
    { href: '/license', label: 'License' },
    { href: '/sign-out', label: 'Sign out' },
  ];

  function handleSignOut() {
    signOut();
  }

  const state = useSelector((state) => state.app.cart);
  const [drop, setDrop] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(state.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [state.cartItems]);

  const { scrollY } = useScroll();

  function update() {
    if (scrollY?.current < scrollY?.prev) {
      setHidden(false);
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setHidden(true);
    }
  }

  const variants = {
    /** this is the "visible" key and it's respective style object **/
    visible: { opacity: 1, y: 0 },
    /** this is the "hidden" key and it's respective style object **/
    hidden: { opacity: 0, y: -25 },
  };

  useEffect(() => {
    return scrollY.onChange(() => update());
  }, [scrollY, update]);

  return (
    // motion.nav for hide and show nav
    <motion.nav
      className="flex justify-between items-center py-[10px] px-[20px] h-[15vh] bg-transparent fixed w-full z-[999] text-black"
      variants={variants}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
    >
      <div className="flex items-center gap-[5px] relative">
        <AiOutlineMenu
          size={25}
          className="mb-[30px] cursor-pointer"
          onClick={() => setDrop(true)}
        />
        {/* sidebar drop onClick to AiOutlineMenu */}
        <SideDrop drop={drop} setDrop={setDrop} />
        <Link href="/">
          <h1 className="text-[60px] sm:text-[70px] font-[600]">JIGIT</h1>
        </Link>
      </div>
      <div className="flex items-center gap-[20px]">
        {session ? (
          <Menu as="div" className="relative inline-block">
            <Menu.Button className="text-gray-600">
              <p className="p-2">{session.user.name}</p>
            </Menu.Button>
            <Menu.Items className="flex flex-col absolute right-0 w-56 origin-top-right bg-white shadow-lg">
              <Menu.Item className='p-3 hover:bg-black/20'>
                <Link className="dropdown-link" href="/order-history">
                  Order History
                </Link>
              </Menu.Item>
              <Menu.Item className='p-3 hover:bg-black/20'>
                <Link
                  className="dropdown-link"
                  href="#"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <Link
            href="/login"
            className="p-2 text-[14px] text-gray-600 font-[600]"
          >
            LOGIN
          </Link>
        )}
        <Link href="/cart" passHref>
          {cartItemsCount > 0 && (
            <span className="absolute top-[20px] right-[10px] text-xs text-white px-2 py-1 bg-blue-900 rounded-full">
              {cartItemsCount}
            </span>
          )}
          <SlBag size={25} />
        </Link>
      </div>
    </motion.nav>
  );
}
