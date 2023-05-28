import { FormEvent, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { GoSettings } from "react-icons/go";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import SearchPageSuggestions from "../../components/SearchPageSuggestions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { categories } from "../../utils/categoriesData";
import axios from "../../utils/axiosConfig";
import { fundraiserInt } from "../../utils/interfaces";

interface FiltersInterface {
  nearby: boolean;
  closeToGoal: boolean;
  category: string[];
}

interface fundraisersFullInt extends fundraiserInt {
  collectedAmount: number;
  lastDonationCreatedAt: Date | null;
}

export default function SearchField() {
  const navigate = useNavigate();

  const [Search, setSearch] = useState<string>("");
  const [Open, setOpen] = useState<boolean>(false);
  const [Filters, setFilters] = useState<FiltersInterface>({
    nearby: false,
    closeToGoal: false,
    category: [],
  });
  const [FiltersCount, setFiltersCount] = useState<number>(0);
  const [City, setCity] = useState<string | null>(null);
  const [LocationPermission, setLocationPermission] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: "geolocation",
        });

        requestLocation();

        setLocationPermission(permissionStatus.state === "granted");
      } catch (error) {
        console.error("Error checking location permission:", error);
      }
    };

    checkLocationPermission();
  }, []);

  const getCityFromCoordinates = async (
    latitude: number,
    longitude: number
  ): Promise<string | null> => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=0c0f56f93cd4481e8b1a3c98e7b14fd7`
      );

      const state = response.data.results[0].components.state;
      return state;
    } catch (error) {
      console.error("Error retrieving city:", error);
      return null;
    }
  };

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationPermission(true);
        getCityFromCoordinates(
          position.coords.latitude,
          position.coords.longitude
        )
          .then((state) => {
            setCity(state);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationPermission(false);
      }
    );
  };

  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    setSearch(target.value);
  };

  const handleFiltersChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      setFiltersCount((prev) => prev + 1);
    } else {
      setFiltersCount((prev) => prev - 1);
    }

    setFilters({
      ...Filters,
      [target.name]: target.checked,
    });
  };

  const handleFiltersCategoriesChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      setFiltersCount((prev) => prev + 1);
      setFilters((pre) => {
        return {
          ...Filters,
          category: [...pre.category, target.value],
        };
      });
    } else {
      setFiltersCount((prev) => prev - 1);
      setFilters((pre) => {
        return {
          ...pre,
          category: [...pre.category.filter((item) => item !== target.value)],
        };
      });
    }
  };

  const handleFiltersReset = () => {
    setFilters({ nearby: false, closeToGoal: false, category: [] });
    setOpen(false);
    setFiltersCount(0);
  };

  const handleSearchSubmit = () => {
    const queryParams = new URLSearchParams();

    queryParams.set("s", Search);
    queryParams.set("c", Filters.category.join(","));
    queryParams.set("n", Filters.nearby ? "1" : "0");
    queryParams.set("g", Filters.closeToGoal ? "1" : "0");

    navigate(`/search/r?${queryParams.toString()}`);
  };

  return (
    <main className="mt-[94px] pt-24 flex flex-col items-center justify-center px-5 md:px-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          handleSearchSubmit();
        }}
        className="relative w-1/3 min-w-fit rounded-full border border-gray-400 flex items-center pr-3 overflow-hidden mb-14"
      >
        <button className="px-2 h-10 flex justify-center items-center outline-none">
          <IconContext.Provider
            value={{ className: "rotate-90 h-6 w-6 text-sm text-gray-600" }}
          >
            <AiOutlineSearch />
          </IconContext.Provider>
        </button>
        <input
          placeholder="Chercher un 3aweni"
          className="w-full outline-none h-10 placeholder:text-sm placeholder:font-thin placeholder:text-gray-600 min-w-[200px]"
          value={Search}
          onChange={handleChange}
        />
        <button
          type="button"
          className={`rounded-md text-sm  ${
            FiltersCount !== 0
              ? "pl-1.5 pr-3 bg-secondary text-white"
              : "px-3 bg-gray-200 text-black"
          } py-1 flex items-center gap-1`}
          onClick={() => setOpen(true)}
        >
          <span
            className={`${
              FiltersCount !== 0 ? "w-4" : "w-0"
            } transition-all overflow-hidden text-sm`}
          >
            {FiltersCount}
          </span>
          Filtres
          <IconContext.Provider
            value={{ className: "rotate-90 h-4 w-4 text-sm" }}
          >
            <GoSettings />
          </IconContext.Provider>
        </button>
      </form>

      {Open && (
        <div
          className="fixed inset-0 bg-gray-600/40 z-[100]"
          onClick={() => {
            setOpen(false);
          }}
        ></div>
      )}

      <div
        className={
          Open
            ? "w-72 fixed top-0 left-0 h-screen bg-white shadow-form z-[101] py-2  flex flex-col flex-nowrap justify-start transition-all duration-300  whitespace-nowrap"
            : "w-72  overflow-hidden fixed top-0 -left-80 h-screen bg-white shadow-form z-[101] flex flex-col flex-nowrap justify-start transition-all duration-300  whitespace-nowrap"
        }
      >
        <div className="w-full flex flex-nowrap justify-between items-center border-b border-gray-300 shrink-0 px-2 pb-2">
          <h3 className="text-lg ">Filtres</h3>

          <button
            className="p-1.5 rounded-full hover:bg-gray-200"
            onClick={() => {
              setOpen(false);
            }}
          >
            <IconContext.Provider value={{ className: "h-5 w-5" }}>
              <IoMdClose />
            </IconContext.Provider>
          </button>
        </div>
        <div className="h-full overflow-auto py-5 px-3 flex flex-col items-start gap-5">
          <div className="relative flex items-center justify-start gap-5 overflow-visible group">
            <p>Près de vous</p>

            {City === null && (
              <div className="absolute bottom-6 left-0 hidden group-hover:block w-fit h-fit bg-red-200 text-red-400 text-xs rounded-md px-2 py-0.5 z-50">
                L'accès à la localisation est requis
              </div>
            )}
            <label
              htmlFor="NearbyToggle"
              className="inline-flex items-center space-x-4 cursor-pointer"
            >
              <span className="relative">
                <input
                  id="NearbyToggle"
                  type="checkbox"
                  name="nearby"
                  disabled={City === null}
                  checked={Filters.nearby}
                  onChange={handleFiltersChange}
                  className="hidden peer"
                />
                <div className="w-11 h-6 rounded-full shadow-inner bg-gray-300 peer-checked:bg-secondary"></div>
                <div className="bg-white absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow  peer-checked:left-5 transition-all duration-200 ease-in-out"></div>
              </span>
            </label>
          </div>
          <div className="flex items-center justify-start gap-5">
            <p>Close to goal</p>
            <label
              htmlFor="CloseToGoalToggle"
              className="inline-flex items-center space-x-4 cursor-pointer"
            >
              <span className="relative">
                <input
                  id="CloseToGoalToggle"
                  type="checkbox"
                  name="closeToGoal"
                  checked={Filters.closeToGoal}
                  onChange={handleFiltersChange}
                  className="hidden peer"
                />
                <div className="w-11 h-6 rounded-full shadow-inner bg-gray-300 peer-checked:bg-secondary"></div>
                <div className="bg-white absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow  peer-checked:left-5 transition-all duration-200 ease-in-out"></div>
              </span>
            </label>
          </div>
          <div className="mt-5 w-full">
            <p>Categorie</p>

            <div className="flex flex-wrap justify-start gap-3 mt-1">
              {categories.map((item) => (
                <label
                key={item.value}
                  className={`relative px-4 py-2 text-sm border ${
                    Filters.category.some((element) => element === item.value)
                      ? "bg-lighter_primary border-primary"
                      : "bg-white shadow-form hover:bg-lighter_primary hover:border-lighter_primary border-white"
                  } hover:cursor-pointer rounded-full select-none`}
                  htmlFor={item.value}
                >
                  {" "}
                  <input
                    type="checkbox"
                    name="category"
                    id={item.value}
                    className="sr-only"
                    onChange={handleFiltersCategoriesChange}
                    required
                    value={item.value}
                    checked={Filters.category.some(
                      (element) => element === item.value
                    )}
                  />{" "}
                  {item.label}{" "}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-nowrap items-center justify-around shrink-0 pt-3 px-3">
          <button
            className="border rounded-2xl border-gray-500 px-4 py-2"
            onClick={() => {
              setOpen(false);
              handleFiltersReset();
            }}
          >
            Restaurer
          </button>

          <button
            onClick={() => {
              setOpen(false);
            }}
            className="border rounded-2xl border-primary px-4 py-2 bg-primary text-white"
          >
            Appliquer
          </button>
        </div>
      </div>

      <div className="w-full  flex flex-col items-center justify-center">
        <SearchPageSuggestions
          locationPermission={LocationPermission}
          city={City}
        />
      </div>
    </main>
  );
}
