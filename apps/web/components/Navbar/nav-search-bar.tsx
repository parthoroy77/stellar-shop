import { Input } from '@repo/ui';
import React from 'react';
import { CgSearch } from 'react-icons/cg';

const NavSearchBar = () => {
  return (
    <div className="flex items-center bg-muted/30 h-[45px]">
      <Input
        placeholder="Search For Products"
        className="min-w-[500px] px-5 bg-transparent rounded-r-none h-[97%] outline-none focus:border-primary right-0"
      />
      <span className=" h-full border rounded-l-none flex items-center text-xl bg-primary text-white px-5 rounded-sm">
        <CgSearch />
      </span>
    </div>
  );
};

export default NavSearchBar;