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
import { useRouter } from 'next/router';
import en from '@/public/locales/en/en';
import ru from '@/public/locales/ru/ru';

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const { data: session } = useSession();
  const [drop, setDrop] = useState(false);

  function handleSignOut() {
    signOut();
  }

  const state = useSelector((state) => state?.app?.cart);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(state?.cartItems?.reduce((a, c) => a + c.quantity, 0));
  }, [state?.cartItems]);

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

  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ru;

  const changeLanguage = (e) => {
    const locale = e.target.value;
    router.push('/', '/', { locale });
  };

  return (
    // motion.nav for hide and show nav
    <>
      <motion.nav
        className="flex justify-between items-center px-[15px] sm:px-[20px] h-[10vh] bg-transparent fixed w-full z-[998] text-black"
        variants={variants}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
      >
        <div className="flex items-center gap-[5px] relative">
          <AiOutlineMenu
            size={25}
            className="mb-3 sm:mb-5 cursor-pointer"
            onClick={() => setDrop(true)}
          />
          <Link href="/">
            <h1 className="hidden sm:inline-block text-[40px] sm:text-[50px] font-[600]">
              JIGIT
            </h1>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-[10px]">
          <Link
            href="/search"
            className="hidden sm:inline-block pr-3 text-[14px] border-b border-b-black"
          >
            {t.search}
          </Link>
          {session ? (
            <Menu as="div" className="relative inline-block">
              <Menu.Button>
                <p className="p-2">
                  {session.user.username || session.user.email}
                </p>
              </Menu.Button>
              <Menu.Items className="flex flex-col absolute right-[-20px] sm:right-0 w-36 sm:w-56 origin-top-right bg-white shadow-lg">
                <Menu.Item className="p-2 sm:p-3 hover:bg-black/20">
                  <Link className="dropdown-link" href="/profile">
                    {t.profile}
                  </Link>
                </Menu.Item>
                <Menu.Item className="p-2 sm:p-3 hover:bg-black/20">
                  <Link className="dropdown-link" href="/order-history">
                    {t.orderHistory}
                  </Link>
                </Menu.Item>
                {session.user.email === 'jigitreply@gmail.com' && (
                  <Menu.Item className="p-2 sm:p-3 hover:bg-black/20">
                    <Link className="dropdown-link" href="/admin">
                      {t.adminDashboard}
                    </Link>
                  </Menu.Item>
                )}
                <Menu.Item className="p-2 sm:p-3 hover:bg-black/20">
                  <Link
                    className="dropdown-link"
                    href="#"
                    onClick={handleSignOut}
                  >
                    {t.signOut}
                  </Link>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link
              href="/login"
              className="p-2 text-[14px] text-gray-600 font-[600]"
            >
              {t.login}
            </Link>
          )}
          <select onChange={changeLanguage} defaultValue={locale} className='p-2 mx-2 bg-transparent focus:outline-none'>
            <option value="en" className=''>EN</option>
            <option value="ru" className=''>RU</option>
          </select>
          <Link href="/cart" passHref className="relative">
            {cartItemsCount > 0 && (
              <span className="absolute top-[-10px] right-[-10px] text-xs text-white px-2 py-1 bg-blue-900 rounded-full">
                {cartItemsCount}
              </span>
            )}
            <SlBag size={25} />
          </Link>
        </div>
      </motion.nav>
      <SideDrop drop={drop} setDrop={setDrop} />
    </>
  );
}
