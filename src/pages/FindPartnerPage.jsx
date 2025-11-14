import { useLoaderData } from "react-router";
import MateIntro from "./../components/MateIntro";
import { useEffect, useState } from "react";

export default function FindPartnerPage() {
  const [mate, setMate] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const allUsers = useLoaderData();
  const usersData = allUsers?.data?.users || [];

  // api search end point
  //  *https://study-mate-api.vercel.app/api/v1/users?slug=query
  //  *https://study-mate-api.vercel.app/api/v1/users?slug=query&sort=-name
  // filter and sort use userLoaderData for better user experience

  // FILTER (Search)
  useEffect(() => {
    setLoading(true);

    const delay = setTimeout(() => {
      if (!query) {
        setMate(usersData);
      } else {
        const result = usersData.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );
        setMate(result);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(delay);
  }, [query, usersData]);

  // SORT
  useEffect(() => {
    if (!sortBy) return;

    setLoading(true);

    const delay = setTimeout(() => {
      const sorted = [...mate];

      if (sortBy === "name") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === "rating") {
        sorted.sort((a, b) => b.ratingAverage - a.ratingAverage);
      } else if (sortBy === "experience") {
        sorted.sort((a, b) =>
          a.experienceLevel.localeCompare(b.experienceLevel)
        );
      }

      setMate(sorted);
      setLoading(false);
    }, 300);

    return () => clearTimeout(delay);
  }, [sortBy]);

  return (
    <div className='pt-8'>
      <div className='flex justify-center items-center sm:justify-around flex-col sm:flex-row'>
        <label className='input'>
          <svg
            className='h-[1em] opacity-50'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <g
              strokeLinejoin='round'
              strokeLinecap='round'
              strokeWidth='2.5'
              fill='none'
              stroke='currentColor'
            >
              <circle cx='11' cy='11' r='8'></circle>
              <path d='m21 21-4.3-4.3'></path>
            </g>
          </svg>
          <input
            type='search'
            required
            placeholder='Search'
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <fieldset className='fieldset min-w-3xs'>
          <select
            onChange={(e) => setSortBy(e.target.value.toLowerCase())}
            className='select'
          >
            <option disabled={true}>Sort By</option>
            <option value='name'>Name</option>
            <option value='rating'>Rating</option>
            <option value='experience'>Experience Level</option>
          </select>
        </fieldset>
      </div>

      <div className='divider'></div>

      {loading ? (
        <div className='flex  h-[30vh] max-w-full justify-center items-center'>
          <span className='loading loading-spinner text-primary'></span>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2'>
          {mate.length > 0 ? (
            mate.map((mate) => <MateIntro key={mate._id} {...mate} />)
          ) : (
            <p className='text-2xl text-primary text-center'>No Mate Found!</p>
          )}
        </div>
      )}
    </div>
  );
}
