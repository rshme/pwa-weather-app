import FeatherIcon from "feather-icons-react";
import React from "react";

export default function Navbar({searchWeather, submit, search}){
    return(
        <nav id="navbar">
            <div className="grid grid-cols-2">
                <a href="#" id="brand" className="text-4xl justify-self-start text-white header-font">The Weather</a>
                {/* form search */}
                <div className="bg-white rounded-3xl flex items-center py-3 px-5 input-wrapper justify-self-end">
                    <FeatherIcon icon="search" width="25" height="25" className="text-gray-500 mr-3" />
                    <input
                        type="text"
                        name="search"
                        className="border-none outline-none text-lg bg-transparent"
                        autoComplete="off"
                        placeholder="Search Country or City..."
                        value={search}
                        onChange={searchWeather}
                        onKeyPress={submit}
                    />
                </div>
                {/* end form search */}
            </div>
        </nav>
    )
}