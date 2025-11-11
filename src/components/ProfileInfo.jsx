import { useState } from "react";
import ProfileInfoItem from "./ProfileInfoItem";
import ProfileInfoDropDownItem from "./ProfileInfoDropDownItem";

export default function ProfileInfo() {
  const [isClick, setIsClick] = useState(false);
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-3 sm:gap-4 md:text-left'>
        <ProfileInfoItem
          isClick={isClick}
          label={"Name"}
          text={"Polas Chandra Barmon"}
          placeholder={"Please Enter Your Name"}
        />

        <ProfileInfoDropDownItem
          isClick={isClick}
          label={"Experience"}
          text={"Expert"}
          options={["Beginner", "Intermediate", "Expert"]}
        />
        <ProfileInfoItem
          isClick={isClick}
          label={"Subject"}
          text={"Mechanical"}
          placeholder={"Please Enter Your Subject"}
        />
        <ProfileInfoDropDownItem
          isClick={isClick}
          label={"Study Mode"}
          text={"Online"}
          options={["Online", "Offline"]}
        />

        <ProfileInfoItem
          isClick={isClick}
          label={"Location"}
          text={"Dinajpur, Bangladesh"}
          placeholder={"Please Enter Your Location"}
        />
        <ProfileInfoDropDownItem
          isClick={isClick}
          label={"Availability Time"}
          text={"Evening 6 – 9 PM"}
          options={[
            "Morning 6:00 AM – 10:00 AM",
            "Lunch 12:00 PM – 2:00 PM",
            "Afternoon 2:00 PM – 6:00 PM",
            "Evening 6:00 PM – 9:00 PM",
            "Night 9:00 PM – 12:00 AM",
            "Late Night 12:00 AM – 6:00 AM",
          ]}
        />
      </div>
      <div className='flex flex-row gap-4 justify-between md:justify-normal'>
        <button
          onClick={() => setIsClick((pre) => !pre)}
          className={`btn btn-soft ${isClick ? "btn-secondary" : "btn-accent"}`}
        >
          {isClick ? "Cancel" : "Edit"}
        </button>
        {isClick && (
          <button
            onClick={() => setIsClick(false)}
            className='btn btn-soft btn-success'
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
