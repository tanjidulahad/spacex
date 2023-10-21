import React, { useCallback, useEffect, useState } from 'react';
import SearchAndFilter from '../SearchAndFilter';
import Rockets from '../Rockets';
import { ConfigProvider, Pagination } from 'antd';
import { getAllEntries } from '../../utils/api';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPageNumber = parseInt(new URLSearchParams(location.search).get('page')) || 1;
    const searchHappened = new URLSearchParams(location.search).get("search")
    const filterHappened = new URLSearchParams(location.search).get("filter")
    const [allEntries, setAllEntries] = useState([]) //will store all data from the api
    const [currentStackEntries, setCurrentStackEntries] = useState([]) //will store only current state data 
    const [displayAbleEntries, setDisplayAbleEntries] = useState([]) //store data to show on every state change in the UI
    const [currentPage, setCurrentPage] = useState(currentPageNumber)
    const [isSearchEnabled, setIsSearchEnabled] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [isFilterEnabled, setIsFilterEnabled] = useState(false)
    const [launchStatsFilter, setLaunchStatusFilter] = useState("")//to store filter by launchStatus
    const [launchDateFilterValue, setLaunchDateFilterValue] = useState("")//to store filter by launch date value 
    const [isUpcomingFlightOn, setIsUpcomingFlightOn] = useState(false)
    const itemPerPage = 9

    //for the first render when component mount
    useEffect(() => {
        getData()

        if (searchHappened || filterHappened) {
            navigate(`?page=${1}`)
            setCurrentPage(1)
        }
    }, [])



    //first render and also every time "allEntries" state changed
    useEffect(() => {

        if (currentStackEntries.length > 0) {

            const startIndex = (currentPage - 1) * itemPerPage
            const lastIndex = currentPage * itemPerPage
            const entries = currentStackEntries.slice(startIndex, lastIndex)
            setDisplayAbleEntries(entries)
        } else {

            setDisplayAbleEntries([])
        }

    }, [currentStackEntries, currentPage])

    //fetching all data from the api
    const getData = async () => {
        const data = await getAllEntries()
        setAllEntries(data)
        setCurrentStackEntries(data)
    }

    //onchange function for the pagination
    const onChangePage = (pageNumber) => {
        setCurrentPage(pageNumber)
        if (isSearchEnabled || isFilterEnabled) {
            navigate(`?page=${pageNumber}${isSearchEnabled ? "&search=true" : ""}${isFilterEnabled ? "&filter=true" : ""}`)
        }
        else {
            navigate(`?page=${pageNumber}`)
        }
    }

    //handle search option
    const handleSearch = (value) => {
        setSearchValue(value)
        if (!isSearchEnabled) {
            setIsSearchEnabled(true)
        }
        let result = []


        if (isFilterEnabled) {
            if (launchStatsFilter) {
                const lauchStatusFiltered = allEntries.filter((item) => item.launch_success?.toString() == launchStatsFilter)
                result = lauchStatusFiltered
            }
            if (launchDateFilterValue) {
                if (result.length > 0) {

                    result = filterByLaunchDate(result, launchDateFilterValue)
                } else {
                    result = filterByLaunchDate(allEntries, launchDateFilterValue)

                }
            }
            if (isUpcomingFlightOn) {

                if (result.length > 0) {

                    result = result.filter((item) => item.upcoming == isUpcomingFlightOn)
                } else {

                    result = allEntries.filter((item) => item.upcoming == isUpcomingFlightOn)
                    
                }
            }

            result = result.filter((item) => {
                if (item.rocket.rocket_name.toLowerCase().includes(value.toLowerCase())) {
                    return item
                }
            })

        } else {
            result = allEntries.filter((item) => {
                if (item.rocket.rocket_name.toLowerCase().includes(value.toLowerCase())) {
                    return item
                }
            })
        }

        setCurrentStackEntries(result)
        setCurrentPage(1)
        navigate(`?page=${1}&search=true`)
    }

    //handle launch status changed filter
    const handleLaunchStatusFilter = (value) => {
        setLaunchStatusFilter(value)
        if (!isFilterEnabled) {
            setIsFilterEnabled(true)
        }
        let result = []
        if (isSearchEnabled) {
            const filterBySearch = allEntries.filter((item) => {
                if (item.rocket.rocket_name.toLowerCase().includes(searchValue.toLowerCase())) {
                    return item
                }
            })
            result = filterBySearch
        }
        if (launchDateFilterValue) {
            if (result.length > 0) {

                result = filterByLaunchDate(result, launchDateFilterValue)
            } else {
                result = filterByLaunchDate(allEntries, launchDateFilterValue)

            }
        }

        if (isUpcomingFlightOn) {
            
            if (result.length > 0) {

                result = result.filter((item) => item.upcoming == isUpcomingFlightOn)
            } else {

                result = allEntries.filter((item) => item.upcoming == isUpcomingFlightOn)
            }
        }
        

        if (isSearchEnabled || launchDateFilterValue || isUpcomingFlightOn) {
            result = result.filter((item) => item.launch_success?.toString() == value);
        } else {
            result = allEntries.filter((item) => item.launch_success?.toString() == value);
        }
        setCurrentStackEntries(result)
        setCurrentPage(1)
        if (isSearchEnabled) {
            navigate(`?page=${1}&search=true&filter=true`)
        } else {
            navigate(`?page=${1}&filter=true`)
        }
    }

    //handle launch date filter state
    const handleByLaunchDateFilter = (value) => {
        setLaunchDateFilterValue(value)
        if (!isFilterEnabled) {
            setIsFilterEnabled(true)
        }
        let result = []
        if (isSearchEnabled) {
            result = allEntries.filter((item) => {
                if (item.rocket.rocket_name.toLowerCase().includes(searchValue.toLowerCase())) {
                    return item
                }
            })
        }

        if (launchStatsFilter) {
            if (result.length > 0) {

                result = result.filter((item) => item.launch_success?.toString() == launchStatsFilter)
            }
            else {

                result = allEntries.filter((item) => item.launch_success?.toString() == launchStatsFilter)
            }
        }

        if (isUpcomingFlightOn) {

            if (result.length > 0) {

                result = result.filter((item) => item.upcoming == isUpcomingFlightOn)
            } else {

                result = allEntries.filter((item) => item.upcoming == isUpcomingFlightOn)
            }
        }

        if (isSearchEnabled || launchStatsFilter || isUpcomingFlightOn) {

            result = filterByLaunchDate(result, value)
        } else {
            result = filterByLaunchDate(allEntries, value)

        }


        setCurrentStackEntries(result)
        setCurrentPage(1)
        if (isSearchEnabled) {
            navigate(`?page=${1}&search=true&filter=true`)
        } else {
            navigate(`?page=${1}&filter=true`)
        }

    }

    //filter by launch Date
    const filterByLaunchDate = (data, value) => {
        const filtered = data.filter((item) => {
            const launchDate = new Date(item.launch_date_utc);
            const currentDate = new Date();

            const timeDifference = currentDate - launchDate;

            if (value == "last_week") {
                if (timeDifference <= 7 * 24 * 60 * 60 * 1000) {
                    return item
                }
            } else if (value == "last_month") {
                if (timeDifference <= 30 * 24 * 60 * 60 * 1000) {
                    return item
                }
            }
            else if (value == "year") {
                if (timeDifference <= 365 * 24 * 60 * 60 * 1000) {
                    return item
                }
            }
        })
        return filtered
    }

    //handle upcoming filter checked
    const handleUpcomingFilterState = () => {

        if (launchStatsFilter && launchDateFilterValue) {
            setIsFilterEnabled(true)
        } else {
            if (!isUpcomingFlightOn) {
                setIsFilterEnabled(true)
            } else {
                setIsFilterEnabled(false)
            }
        }
        let result = []
        if (isSearchEnabled) {
            result = allEntries.filter((item) => {
                if (item.rocket.rocket_name.toLowerCase().includes(searchValue.toLowerCase())) {
                    return item
                }
            })
        }

        if (launchStatsFilter) {
            if (result.length > 0) {

                result = result.filter((item) => item.launch_success?.toString() == launchStatsFilter)
            } else {
                result = allEntries.filter((item) => item.launch_success?.toString() == launchStatsFilter)

            }

        }
        if (launchDateFilterValue) {
            if (result.length > 0) {

                result = filterByLaunchDate(result, launchDateFilterValue)
            } else {
                result = filterByLaunchDate(allEntries, launchDateFilterValue)

            }
        }

        if (isSearchEnabled || launchStatsFilter || launchDateFilterValue) {
            result = result.filter((item) => item.upcoming == !isUpcomingFlightOn)
        } else {
            result = allEntries.filter((item) => item.upcoming == !isUpcomingFlightOn)

        }
        setIsUpcomingFlightOn(!isUpcomingFlightOn)
        setCurrentStackEntries(result)
        setCurrentPage(1)
        if (isSearchEnabled && (launchStatsFilter || launchDateFilterValue ||!isUpcomingFlightOn)) {
            navigate(`?page=${1}&search=true&filter=true`)
        } else if (isSearchEnabled) {
            navigate(`?page=${1}&search=true`)
        } else if (launchStatsFilter || launchDateFilterValue || !isUpcomingFlightOn) {
            navigate(`?page=${1}&filter=true`)

        }
        else {

            navigate(`?page=${1}`)
        }
    }


    return (
        <div >
            <div className='sm:text-center px-5 sm:px-0 py-10'>
                <h1 className='font-barlow font-medium text-[28px] sm:text-[40px] text-gray-900'>Spaceflight details</h1>
                <p className='font-barlow font-normal text-base text-gray-700'>Find out the elaborate features of all the past big spaceflights.</p>
            </div>
            {allEntries.length && <div>
                <SearchAndFilter handleSearch={handleSearch} handleLaunchStatusFilter={handleLaunchStatusFilter} handleByLaunchDateFilter={handleByLaunchDateFilter} handleUpcomingFilterState={handleUpcomingFilterState} />
            </div>}
            <div className='px-5 md:px-16 lg:px-28 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    displayAbleEntries.map((item, idx) => (
                        <Rockets key={idx} item={item} />

                    ))
                }
            </div>
            {
                currentStackEntries.length > 9 &&
                <div className='px-5 md:px-28 py-5 text-center'>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorText: "#0D6EFD",
                                colorPrimary: "white",
                                borderRadius: 0
                            },
                            components: {
                                Pagination: {
                                    itemActiveBg: "#0D6EFD",

                                }
                            },
                        }}
                    >
                        <Pagination showSizeChanger={false} current={currentPage} total={currentStackEntries.length} onChange={onChangePage} pageSize={9} />
                    </ConfigProvider>
                </div>
            }

            {/* footer */}
            <div>
                <p className='font-barlow text-base text-gray-700 text-center pt-10 pb-5'>Created by the brilliant minds behind SpaceX</p>
            </div>

        </div>
    );
};

export default Home;