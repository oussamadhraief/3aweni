import React from 'react'

export default function Pagination({ PageNumber, Count, handlePageChange }: { PageNumber: number, Count: number, handlePageChange: (page: number) => void }) {
  return (
    <div className="flex items-center">
                <button onClick={() => handlePageChange(PageNumber - 1)}
                  disabled={PageNumber == 1}
                  className="w-full p-4 text-base text-gray-600 bg-white cursor-pointer border rounded-l-xl hover:bg-gray-100"
                >
                  <svg
                    width="9"
                    fill="currentColor"
                    height="8"
                    className=""
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
                {((PageNumber > 2 || Count == 0 || !(Count > 3)))  ? <button onClick={() => handlePageChange(1)}
                  type="button"
                  className={`w-full px-4 py-2 cursor-pointer text-base text-text-zinc-700 border-y bg-white  hover:bg-gray-100 `}
                >
                  1
                </button> : null}
                {PageNumber > 3 && (
                  <button
                    disabled
                    className={`w-full px-4 py-2 cursor-pointer text-base text-text-zinc-700 border-y bg-white hover:bg-gray-100`}
                  >
                    ...
                  </button>
                )}

                {Count > 1 && <button onClick={() => handlePageChange(PageNumber < 2 ? PageNumber : PageNumber == Count ? PageNumber -2 : PageNumber - 1)}
                    className={`w-full px-4 py-2 cursor-pointer text-base text-text-zinc-700 border-y ${PageNumber == (PageNumber < 2 ? PageNumber : PageNumber == Count ? PageNumber -2 : PageNumber - 1) ? 'bg-lighter_blue border-x border-x-lighter_blue hover:bg-gray-100' : 'bg-white  hover:bg-gray-100'} `}
                  >
                    {PageNumber < 2 ? PageNumber : PageNumber == Count ? PageNumber -2 : PageNumber - 1}
                  </button>}

                {Count > 1 && <button onClick={() => handlePageChange(PageNumber < 2 ? PageNumber + 1 : PageNumber == Count ? PageNumber - 1 : PageNumber)}
                    className={`w-full px-4 py-2 cursor-pointer text-base text-text-zinc-700 border-y ${PageNumber == (PageNumber < 2 ? PageNumber + 1 : PageNumber == Count ? PageNumber - 1 : PageNumber) ? 'bg-lighter_blue border-x border-x-lighter_blue hover:bg-gray-100' : 'bg-white  hover:bg-gray-100'} `}
                  >
                    {PageNumber < 2 ? PageNumber + 1 : PageNumber == Count ? PageNumber - 1 : PageNumber}
                  </button>}

                {Count > 1 && <button onClick={() => handlePageChange(PageNumber < 2 ? PageNumber + 2 : PageNumber == Count ? PageNumber : PageNumber + 1)}
                    className={`w-full px-4 py-2 cursor-pointer text-base text-text-zinc-700 border-y ${PageNumber == (PageNumber < 2 ? PageNumber + 2 : PageNumber == Count ? PageNumber : PageNumber + 1) ? 'bg-lighter_blue border-x border-x-lighter_blue hover:bg-gray-100' : 'bg-white  hover:bg-gray-100'} `}
                  >
                    {PageNumber < 2 ? PageNumber + 2 : PageNumber == Count ? PageNumber : PageNumber + 1}
                  </button>}


                {PageNumber < Count - 2 && (
                  <button
                    disabled
                    className={`w-full px-4 py-2 cursor-pointer text-base text-text-zinc-700 border-y bg-white  hover:bg-gray-100 `}
                  >
                    ...
                  </button>
                )}
                {(PageNumber < Count -1 && Count > 3) && <button onClick={() => handlePageChange(Count)}
                  className={`w-full px-4 py-2 cursor-pointer text-base text-text-zinc-700 border-y bg-white  hover:bg-gray-100 `}
                >
                  {Count}
                </button>}
                <button onClick={() => handlePageChange(PageNumber + 1)}
                  disabled={PageNumber == Count}
                  type="button"
                  className="w-full p-4 text-base text-gray-600 bg-white cursor-pointer border-t border-b border-x rounded-r-xl hover:bg-gray-100"
                >
                  <svg
                    width="9"
                    fill="currentColor"
                    height="8"
                    className=""
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
  )
}
