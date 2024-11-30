import React, { useState } from "react";
import "./MobileMain.css"
import { MobileHaznaka } from "./MobileHaznaka";
import { MobileHaznakaMessage } from "./MobileHaznakaMessage";
import { useMobileContext } from "../../contexts/MobileContext";
export const MobileMain = () => {
    const { huzneku, setHuzneku ,iconIphoneClicked, setIconIphoneClicked} = useMobileContext();
    const [backgroundImage, setBackgroundImage] = useState(!iconIphoneClicked? `url('${process.env.PUBLIC_URL}/mobileMain.png')`:`url('${process.env.PUBLIC_URL}/mobileHaznaka2.png')`);
    const clickHandler = () => {
        setBackgroundImage(`url('${process.env.PUBLIC_URL}/mobileHaznaka2.png')`);
        setIconIphoneClicked(true);
    }
    return (
        <div class="mobile-screen" style={{ "--backgraound-image": backgroundImage }}>
            {!iconIphoneClicked ?
                <svg xmlns="http://www.w3.org/2000/svg" width="73" height="96" viewBox="0 0 73 96" className="app-icon" onClick={clickHandler}>
                    <rect id="Rectangle_614" data-name="Rectangle 614" width="66" height="66" rx="26" transform="translate(3)" />
                    <g id="Group_464" data-name="Group 464" transform="translate(-1971.272 -3119.895)">
                        <path id="Rectangle_615" data-name="Rectangle 615" d="M1.469,0h0A1.469,1.469,0,0,1,2.939,1.469V6.977A1.469,1.469,0,0,1,1.47,8.447h0A1.469,1.469,0,0,1,0,6.977V1.469A1.469,1.469,0,0,1,1.469,0Z" transform="translate(2005.803 3132.308)" fill="#fff" />
                        <path id="Path_468" data-name="Path 468" d="M98.321,32.908a1.465,1.465,0,0,1-1.265-.73L94.292,27.39a1.459,1.459,0,0,1,.534-1.993l.018-.01a1.459,1.459,0,0,1,1.993.534L99.6,30.708a1.459,1.459,0,0,1-.534,1.993l-.018.01a1.46,1.46,0,0,1-.729.2" transform="translate(1900.347 3110.155)" fill="#fff" />
                        <path id="Path_469" data-name="Path 469" d="M31.439,99.8a1.46,1.46,0,0,1-.729-.2l-4.788-2.764a1.461,1.461,0,0,1-.534-1.993l.01-.018a1.459,1.459,0,0,1,1.993-.534l4.788,2.764a1.459,1.459,0,0,1,.534,1.993l-.01.018a1.464,1.464,0,0,1-1.265.73" transform="translate(1960.938 3049.557)" fill="#fff" />
                        <path id="Rectangle_616" data-name="Rectangle 616" d="M1.469,0H6.977A1.469,1.469,0,0,1,8.447,1.469v0A1.469,1.469,0,0,1,6.977,2.939H1.469A1.469,1.469,0,0,1,0,1.469v0A1.469,1.469,0,0,1,1.469,0Z" transform="translate(1983.093 3155.017)" fill="#fff" />
                        <rect id="Rectangle_617" data-name="Rectangle 617" width="8.447" height="2.939" rx="1.469" transform="translate(2023.004 3155.017)" fill="#fff" />
                        <path id="Path_470" data-name="Path 470" d="M313.2,99.8a1.464,1.464,0,0,1-1.265-.73l-.01-.018a1.461,1.461,0,0,1,.534-1.993L317.25,94.3a1.459,1.459,0,0,1,1.994.534l.01.018a1.459,1.459,0,0,1-.534,1.993l-4.788,2.764a1.459,1.459,0,0,1-.728.2" transform="translate(1708.963 3049.557)" fill="#fff" />
                        <path id="Path_471" data-name="Path 471" d="M261.013,32.908a1.461,1.461,0,0,1-.729-.2l-.017-.01a1.461,1.461,0,0,1-.535-1.994l2.764-4.788a1.459,1.459,0,0,1,1.993-.534l.017.01a1.461,1.461,0,0,1,.535,1.994l-2.764,4.788a1.464,1.464,0,0,1-1.265.73" transform="translate(1754.863 3110.155)" fill="#fff" />
                        <path id="Path_472" data-name="Path 472" d="M118.953,105.435a12.936,12.936,0,0,0-25.873,0,4.248,4.248,0,0,0,0,.8v12.284h25.889v-13.08Zm-11.755-8.2c-4.866.092-8.76,3.585-8.68,7.787l0,.084-.008.041a2.037,2.037,0,0,0,.012.327.846.846,0,0,1-.757.926l-.069,0a.847.847,0,0,1-.857-.762,3.581,3.581,0,0,1-.015-.638c-.066-5.113,4.561-9.353,10.341-9.463a.847.847,0,0,1,.032,1.693" transform="translate(1901.256 3050.966)" fill="#fff" />
                    </g>
                </svg>
                : !huzneku ? <MobileHaznaka />
                    : <MobileHaznakaMessage setBackgroundImage={setBackgroundImage} />
            }
        </div>
    )
}