import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';

const Rockets = ({ item }) => {
    const [imgSrc, setImgSrc] = useState("")
    const [launchDate, setLaunchDate] = useState("")
    const [missionName, setMissionName] = useState("")
    const [rocketName, setRocketName] = useState("")

    useEffect(() => {
        setImgSrc(item?.links?.mission_patch_small)
        setLaunchDate(moment.unix(item?.launch_date_unix).format('D MMM, YYYY'))
        setMissionName(item?.mission_name)
        setRocketName(item?.rocket?.rocket_name)
    }, [item])

    return (
        <div className='p-8 border border-gray-400 rounded-lg flex flex-col justify-center items-center'>
            <img className='w-[124px] h-[124px]' src={imgSrc ? imgSrc : "dummy.png"} alt="" />
            <div className='font-barlow text-center'>
                <div className='py-5 space-y-2'>
                    <p className='text-base text-gray-600'>Launch Date: <span className='text-gray-800'>{launchDate}</span></p>
                    <h4 className='font-medium text-2xl text-gray-900'>{missionName}</h4>
                    <p className='text-sm'>{rocketName}</p>
                </div>
                <div className='flex flex-col space-y-2 items-center justify-center'>
                    <p className='font-medium text-base text-gray-600'>Launch Status:</p>
                    {
                        item?.launch_success == false &&
                        <h6 className='font-bold text-xs text-white bg-[#DC3545] p-1 rounded-[4px]'>Failed</h6>
                    }
                    {
                        item?.launch_success == true &&
                        <h6 className='font-bold text-xs text-white bg-[#198754] p-1 rounded-[4px]'>Success</h6>

                    }
                    {
                        item?.launch_success==null&&
                        <h6 className='font-bold text-xs text-white bg-gray-600 p-1 rounded-[4px]'>Un Identified</h6>
                    }
                </div>
            </div>
        </div>
    );
};

export default Rockets;