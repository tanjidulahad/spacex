
import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs"

const SearchAndFilter = ({ handleSearch,handleLaunchStatusFilter,handleByLaunchDateFilter,handleUpcomingFilterState }) => {
    const [searchValue, setSearchValue] = useState("")

    //handle searchValue state change
    const handleSearchValueUpdate = (e) => {
        e.preventDefault()
        handleSearch(searchValue)
    }

    const onLaunchDateChange = (e) => {
        handleByLaunchDateFilter(e.target.value)
    }
    const onLaunchStatusChange = (e) => {
        handleLaunchStatusFilter(e.target.value)
    }


    return (
        <div className='px-5 md:px-16 lg:px-28 py-10'>
            <div className='flex flex-col gap-3 md:gap-6 md:flex-row md:justify-between md:items-end'>
                <div className='md:w-[255px] lg:w-[424px]'>
                    <form onSubmit={handleSearchValueUpdate}>
                        <div className='flex'>
                            <input className='border border-gray-400 outline-none py-2 px-3 rounded-l-[4px] w-full' type="text" name="search" placeholder='Search...' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
                            <div onClick={handleSearchValueUpdate} className='bg-[#0D6EFD] flex items-center justify-center w-[42px] rounded-r-[4px] cursor-pointer'>
                                <BsSearch color='white' />
                            </div>
                        </div>
                    </form>
                </div>

                <div className='flex flex-col-reverse md:flex-row mt-3 md:mt-0 gap-3 items-end'>
                    <div className='w-full md:w-[185px] lg:w-[256px]'>
                        <select className='border border-gray-400 outline-none py-2 pl-2 rounded-[4px] w-full' onChange={onLaunchStatusChange} required>
                            <option value="" disabled selected>By Launch Status</option>
                            <option value="false">Failure</option>
                            <option value="true">Success</option>
                        </select>
                    </div>

                    <div className='flex w-full md:w-auto flex-col gap-3'>
                        <div className='flex md:justify-end gap-2 items-center'>
                            <input onChange={handleUpcomingFilterState} className='font-barlow text-base mt-1' type="checkbox" name="" id="upcoming" />
                            <label htmlFor="upcoming">Show upcoming only</label>
                        </div>
                        <div className='md:w-[185px] lg:w-[256px]'>
                            <select className='border border-gray-400 outline-none py-2 pl-2 rounded-[4px] w-full' onChange={onLaunchDateChange} required>
                                <option value="" disabled selected>By Launch Date</option>
                                <option value="last_week">Last Week</option>
                                <option value="last_month">Last Month</option>
                                <option value="year">Last Year</option>
                            </select>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default SearchAndFilter;