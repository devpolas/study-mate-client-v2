import { useState } from "react";
import ProfileInfoItem from "./ProfileInfoItem";
import ProfileInfoDropDownItem from "./ProfileInfoDropDownItem";
import useUserContext from "./../context/useUserContext";
import { uploadImageToImgBB } from "../http/imageUpload";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function ProfileInfo({ user }) {
  const [isClick, setIsClick] = useState(false);
  const locationPath = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState({
    name: user?.name || "",
    experienceLevel: user?.experienceLevel || "",
    subject: user?.subject || "",
    studyMode: user?.studyMode || false,
    location: user?.location || "",
    availability: user?.availability || "",
    image: user?.image || null,
  });

  const { setIsLoading, setIsError, isLoading, updateMe } = useUserContext();

  async function handelUpdate() {
    const {
      name,
      image,
      subject,
      studyMode,
      availability,
      experienceLevel,
      location,
    } = value;

    try {
      setIsLoading(true);
      setIsError("");
      let url;
      if (image) {
        url = await uploadImageToImgBB(user?.slug, image);
      }
      const result = await updateMe({
        name,
        profileImage: url || user?.image,
        subject,
        studyMode,
        availability,
        experienceLevel,
        location,
      });
      if (result) {
        toast.success("successfully updated!");
        setIsClick(false);
        navigate(locationPath.pathname, { replace: true });
      }
    } catch (error) {
      toast.error("fail to update!");
      const msg = error?.message || error?.status || "Fail to update!";
      setIsError(msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-3 sm:gap-4 md:text-left'>
        {isClick && (
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Pick Profile Image!</legend>
            <input
              onChange={(e) => setValue({ ...value, image: e.target.files[0] })}
              type='file'
              className='file-input'
            />
            <label className='label text-green-500'>Max size 2MB</label>
          </fieldset>
        )}
        <ProfileInfoItem
          isClick={isClick}
          label={"Name"}
          text={user?.name}
          placeholder={"Please Enter Your Name"}
          onChange={(e) => setValue({ ...value, name: e.target.value })}
        />

        <ProfileInfoDropDownItem
          isClick={isClick}
          label={"Experience"}
          text={user?.experienceLevel}
          options={["beginner", "intermediate", "expert"]}
          onChange={(e) =>
            setValue({ ...value, experienceLevel: e.target.value })
          }
        />
        <ProfileInfoItem
          isClick={isClick}
          label={"Subject"}
          text={user?.subject}
          placeholder={"Please Enter Your Subject"}
          onChange={(e) => setValue({ ...value, subject: e.target.value })}
        />
        <ProfileInfoDropDownItem
          isClick={isClick}
          label={"Study Mode"}
          text={user?.studyMode ? "Online" : "Offline"}
          options={["Online", "Offline"]}
          onChange={(e) =>
            setValue({
              ...value,
              studyMode: e.target.value === "Online" ? true : false,
            })
          }
        />

        <ProfileInfoItem
          isClick={isClick}
          label={"Location"}
          text={user?.location}
          placeholder={"Please Enter Your Location"}
          onChange={(e) => setValue({ ...value, location: e.target.value })}
        />
        <ProfileInfoDropDownItem
          isClick={isClick}
          label={"Availability Time"}
          text={user?.availability}
          options={[
            "Morning 6:00 AM – 10:00 AM",
            "Lunch 12:00 PM – 2:00 PM",
            "Afternoon 2:00 PM – 6:00 PM",
            "Evening 6:00 PM – 9:00 PM",
            "Night 9:00 PM – 12:00 AM",
            "Late Night 12:00 AM – 6:00 AM",
          ]}
          onChange={(e) => setValue({ ...value, availability: e.target.value })}
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
            onClick={() => handelUpdate()}
            disabled={isLoading}
            className='btn btn-soft btn-success'
          >
            {isLoading ? (
              <span className='loading loading-spinner text-primary'></span>
            ) : (
              <span>Save</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
