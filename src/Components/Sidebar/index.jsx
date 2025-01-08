/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { RiDashboardFill } from 'react-icons/ri';
import { BiTransferAlt, BiLogOut } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

function index() {
  const [active, setActive] = useState(false);
  const [device, setDevice] = useState('desktop');
  const [selected, setSelected] = useState('Dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setDevice('mobile');
        setActive(false);
      } else if (window.innerWidth <= 1024) {
        setDevice('tablet');
        setActive(true);
      } else {
        setDevice('desktop');
        setActive(false);
      }
    }
    handleResize();
    addEventListener('resize', () => {
      console.log('size changed');
      handleResize();
    });
    return () => {
      removeEventListener('resize', () => {
        console.log('Listener removed');
        handleResize();
      });
    };
  }, []);

  return (
    <div
      className={`bg-gradient-to-b from-[#035685] to-[#053E5E] h-full ${
        device === 'mobile' ? `${active ? 'w-72' : 'w-16'}` : 'w-16'
      } duration-500 px-4 py-5 flex flex-col justify-between `}>
      <div>
        {device === 'mobile' ? (
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              className={`text-3xl text-white ${
                device === 'mobile' ? `${active ? 'mr-4' : 'm-auto'}` : `m-auto`
              } cursor-pointer`}
              size={26}
              onClick={() => setActive(!active)}
            />
          </div>
        ) : (
          <></>
        )}
        <div className=" flex flex-col ite right-1 gap-20 relative">
          <Link
            to={'/'}
            className={`group flex text-sm gap-3.5 font-medium p-2 hover:bg-white hover:bg-opacity-50 rounded-md`}>
            <div>
              {React.createElement(RiDashboardFill, {
                size: 26,
                className: `${selected === 'Dashboard' ? 'text-[#fff]' : 'text-[#666]'} ${
                  active ? 'm-auto' : 'm-auto'
                }`,
                onClick: () => setSelected('Dashboard')
              })}
            </div>
            {device === 'mobile' ? (
              <h2
                style={{ transitionDelay: `${0 * 2}00ms` }}
                className={`${
                  selected === 'Dashboard'
                    ? `text-[#fff] whitespace-pre duration-500 ${
                        !active && 'opacity-0 translate-x-28 overflow-hidden'
                      }`
                    : `text-[#666] whitespace-pre duration-500 ${
                        !active && 'opacity-0 translate-x-28 overflow-hidden'
                      }`
                }`}
                onClick={() => setSelected('Dashboard')}>
                Dashboard
              </h2>
            ) : (
              <></>
            )}

            <h2
              className={` ${
                active ? ' hidden' : ''
              } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
              Dashboard
            </h2>
          </Link>
          <Link
            to={'/device-list'}
            className={`group flex text-sm gap-3.5 font-medium p-2 hover:bg-white hover:bg-opacity-50 rounded-md`}>
            <div>
              {React.createElement(BiTransferAlt, {
                size: 26,
                className: `${selected === 'DeviceList' ? 'text-[#fff]' : 'text-[#666]'} ${
                  active ? 'm-auto' : 'm-auto'
                }`,
                onClick: () => setSelected('DeviceList')
              })}
            </div>
            {device === 'mobile' ? (
              <h2
                style={{ transitionDelay: `${0 * 2}00ms` }}
                className={`${
                  selected === 'DeviceList'
                    ? `text-[#fff] whitespace-pre duration-500 ${
                        !active && 'opacity-0 translate-x-28 overflow-hidden'
                      }`
                    : `text-[#666666] whitespace-pre duration-500 ${
                        !active && 'opacity-0 translate-x-28 overflow-hidden'
                      }`
                }`}
                onClick={() => setSelected('DeviceList')}>
                Device List
              </h2>
            ) : (
              <></>
            )}
            <h2
              className={` ${
                active ? ' hidden' : ''
              } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
              Device List
            </h2>
          </Link>
          <Link
            to={'/sign-in'}
            onClick={() => {
              const token = sessionStorage.getItem('token');
              // setSelected('Logout'); // Assuming setSelected is defined elsewhere
              if (token) {
                sessionStorage.removeItem('token');
                navigate('/sign-in');
                return;
              }
            }}
            className={`group flex text-sm gap-3.5 font-medium p-2 hover:bg-white hover:bg-opacity-50 rounded-md`}>
            <div>
              {React.createElement(BiLogOut, {
                size: 26,
                className: `${selected === 'Logout' ? 'text-[#fff]' : 'text-[#666]'} ${
                  active ? 'm-auto' : 'm-auto'
                }`,
                onClick: () => setSelected('Logout')
              })}
            </div>
            {device === 'mobile' ? (
              <h2
                style={{ transitionDelay: `${0 * 2}00ms` }}
                className={`${
                  selected === 'Logout'
                    ? `text-[#fff] whitespace-pre duration-500 ${
                        !active && 'opacity-0 translate-x-28 overflow-hidden'
                      }`
                    : `text-[#666666] whitespace-pre duration-500 ${
                        !active && 'opacity-0 translate-x-28 overflow-hidden'
                      }`
                }`}
                onClick={() => {
                  const token = sessionStorage.getItem('token');
                  setSelected('Logout'); // Assuming setSelected is defined elsewhere
                  if (token) {
                    sessionStorage.removeItem('token');
                    navigate('/sign-in');
                    return;
                  }
                }}>
                Logout
              </h2>
            ) : (
              <></>
            )}
            <h2
              className={` ${
                active ? ' hidden' : ''
              } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
              Logout
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default index;
