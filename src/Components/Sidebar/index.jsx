import React, { useEffect, useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { RiDashboardFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function index() {
  const [active, setActive] = useState(false);
  const [device, setDevice] = useState('');
  const [selected, setSelected] = useState('Dashboard');

  useEffect(() => {
    if (window.innerWidth < 768) {
      setDevice('mobile');
    } else if (window.innerWidth < 1024) {
      setDevice('tablet');
    } else {
      setDevice('desktop');
    }
  }, []);

  useEffect(() => {
    if (device === 'mobile') {
      setActive(false);
    } else {
      setActive(false);
    }
  }, [device]);

  addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      setDevice('mobile');
    } else if (window.innerWidth < 1024) {
      setDevice('tablet');
    } else {
      setDevice('desktop');
    }
  });

  return (
    <div
      className={`bg-gradient-to-b from-[#035685] to-[#053E5E] h-full ${
        device === 'mobile' ? `${active ? 'w-72' : ''}` : 'w-16'
      } duration-500 px-4 py-5 flex flex-col justify-between `}>
      <div>
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            className={`text-3xl text-white ${
              device === 'mobile' ? `${active ? 'mr-4' : 'm-auto'}` : `m-auto`
            } cursor-pointer`}
            size={26}
            onClick={() => setActive(!active)}
          />
        </div>
        <div className=" top-20 flex flex-col gap-4 relative">
          <Link
            to={'/'}
            className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-blue-100 bg-opacity-10 rounded-md`}>
            <div>
              {React.createElement(RiDashboardFill, {
                size: 26,
                className: `${selected === 'Dashboard' ? 'text-[#fff]' : 'text-[#666]'} ${
                  active ? 'mr-4' : ''
                }`,
                onClick: () => setSelected('Dashboard')
              })}
            </div>
            <h2
              style={{ transitionDelay: `${0 * 2}00ms` }}
              className={`${
                selected === 'Dashboard'
                  ? `text-[#fff] whitespace-pre duration-500 ${
                      !active && 'opacity-0 translate-x-28 overflow-hidden'
                    }`
                  : `text-[#666666] whitespace-pre duration-500 ${
                      !active && 'opacity-0 translate-x-28 overflow-hidden'
                    }`
              }`}
              onClick={() => setSelected('Dashboard')}>
              Dashboard
            </h2>
            <h2
              className={` ${
                active ? ' hidden' : ''
              } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
              Dashboard
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default index;
